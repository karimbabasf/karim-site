"""Hero backdrop: a dark ink surface with a slow swell, lit at a grazing angle.
Loops: the noise is sampled along a circle, so frame N equals frame 0."""
import bpy, math, sys

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = argv[0] if argv else "/tmp/swell/f_"
FRAMES = int(argv[1]) if len(argv) > 1 else 180
W, H = 1440, 810

scene = bpy.context.scene
for o in list(bpy.data.objects):
    bpy.data.objects.remove(o, do_unlink=True)

scene.render.engine = "CYCLES"
scene.cycles.device = "GPU"
prefs = bpy.context.preferences.addons["cycles"].preferences
prefs.compute_device_type = "METAL"
prefs.get_devices()
for d in prefs.devices: d.use = True
scene.cycles.samples = 40
scene.cycles.use_denoising = True
scene.render.resolution_x, scene.render.resolution_y = W, H
scene.render.fps = 30
scene.frame_start, scene.frame_end = 0, FRAMES - 1
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = OUT
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "AgX - Medium High Contrast"

world = bpy.data.worlds.new("ink")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs[0].default_value = (0.0045, 0.0048, 0.0062, 1)
bg.inputs[1].default_value = 1.0

# Surface
bpy.ops.mesh.primitive_grid_add(x_subdivisions=520, y_subdivisions=520, size=40)
plane = bpy.context.active_object
bpy.ops.object.shade_smooth()

bpy.ops.object.empty_add(location=(0, 0, 0))
driver_obj = bpy.context.active_object
R = 1.6
for axis, expr in ((0, f"{R}*cos(2*pi*frame/{FRAMES})"), (1, f"{R}*sin(2*pi*frame/{FRAMES})")):
    fc = driver_obj.driver_add("location", axis)
    fc.driver.expression = expr

tex = bpy.data.textures.new("swell", type="CLOUDS")
tex.noise_scale = 3.4
tex.noise_depth = 1
tex.noise_basis = "ORIGINAL_PERLIN"
mod = plane.modifiers.new("disp", "DISPLACE")
mod.texture = tex
mod.texture_coords = "OBJECT"
mod.texture_coords_object = driver_obj
mod.strength = 0.75
mod.mid_level = 0.5

mat = bpy.data.materials.new("ink")
mat.use_nodes = True
bsdf = mat.node_tree.nodes["Principled BSDF"]
bsdf.inputs["Base Color"].default_value = (0.004, 0.0045, 0.006, 1)
bsdf.inputs["Roughness"].default_value = 0.24
bsdf.inputs["Specular IOR Level"].default_value = 0.6
plane.data.materials.append(mat)

# Lights: emissive strips behind the horizon; the surface only shows their reflections
def strip(name, loc, sx, sz, color, strength):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc, rotation=(math.radians(90), 0, 0))
    o = bpy.context.active_object
    o.name = name
    o.scale = (sx, sz, 1)
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs[0].default_value = color
    em.inputs[1].default_value = strength
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    nt.links.new(em.outputs[0], out.inputs[0])
    o.data.materials.append(m)
    o.visible_camera = False
    return o

strip("key", (1.5, 16, 3.2), 14, 1.6, (0.86, 0.89, 0.96, 1), 2.4)
strip("rim", (-5, 14, 1.3), 6, 0.35, (0.25, 1.0, 0.42, 1), 6)

bpy.ops.object.camera_add(location=(0, -9, 2.4), rotation=(math.radians(76), 0, 0))
cam = bpy.context.active_object
cam.data.lens = 42
cam.data.dof.use_dof = True
cam.data.dof.focus_distance = 11
cam.data.dof.aperture_fstop = 2.2
scene.camera = cam

bpy.ops.render.render(animation=True)
