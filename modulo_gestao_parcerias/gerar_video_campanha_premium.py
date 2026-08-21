import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from moviepy import VideoFileClip, AudioFileClip, CompositeVideoClip, CompositeAudioClip
from moviepy.video.fx import CrossFadeIn

# Configurações das Cenas Animadas 2D
SCENES = [
    {
        "id": 1,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_1_escuta_populacao_1784768968393.jpg",
        "title": "Cena 1: A Voz do Povo",
        "subtitle": "Ouvir a populacao e o primeiro passo. O futuro e colaborativo!",
        "movement": "pan_horizontal"
    },
    {
        "id": 2,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_2_planejamento_obras_1784769052165.jpg",
        "title": "Cena 2: Planejamento",
        "subtitle": "Planejamento e fiscalizacao com o Obrasgov.br.",
        "movement": "zoom_in_fast"
    },
    {
        "id": 3,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_3_desburocratizacao_1784769158016.jpg",
        "title": "Cena 3: Eficiencia Digital",
        "subtitle": "Mais eficiencia e menos papel com o Transferegov.br.",
        "movement": "zoom_out"
    },
    {
        "id": 4,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_4_contratos_controle_1784769242382.jpg",
        "title": "Cena 4: Controle de Contratos",
        "subtitle": "Fiscalizacao de contratos em tempo real com o Contratos.gov.br.",
        "movement": "pan_vertical"
    },
    {
        "id": 5,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_5_futuro_colaborativo_1784769326154.jpg",
        "title": "Cena 5: Futuro Colaborativo",
        "subtitle": "Rede de Parcerias: O futuro e colaborativo!",
        "movement": "zoom_in_up"
    },
    {
        "id": 6,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_6_queima_fogos_1784774393182.jpg",
        "title": "Cena 6: O Futuro ja Comecou",
        "subtitle": "Com integridade, parceria e inovacao, construimos um amanha brilhante.",
        "movement": "zoom_in_slow"
    }
]

# Configurações do Vídeo
WIDTH = 1280
HEIGHT = 720
FPS = 30

def create_animated_clip_video(scene, output_path, duration):
    print(f"Gerando vídeo para Cena {scene['id']} com movimento '{scene['movement']}' (Duração: {duration:.2f}s)...")
    
    total_frames = int(duration * FPS)
    img_pil = Image.open(scene["image"]).convert('RGB')
    orig_w, orig_h = img_pil.size
    target_ratio = WIDTH / HEIGHT
    orig_ratio = orig_w / orig_h
    
    # Crop base para 16:9
    if orig_ratio > target_ratio:
        new_w = int(orig_h * target_ratio)
        offset = (orig_w - new_w) // 2
        img_cropped = img_pil.crop((offset, 0, offset + new_w, orig_h))
    else:
        new_h = int(orig_w / target_ratio)
        offset = (orig_h - new_h) // 2
        img_cropped = img_pil.crop((0, offset, orig_w, offset + new_h))
        
    img_base = img_cropped.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(output_path, fourcc, FPS, (WIDTH, HEIGHT))
    
    for i in range(total_frames):
        t = i / (total_frames - 1)
        
        # Movimento de Câmera Personalizado
        if scene["movement"] == "pan_horizontal":
            zoom = 1.15
            crop_w = int(WIDTH / zoom)
            crop_h = int(HEIGHT / zoom)
            max_x_offset = WIDTH - crop_w
            x1 = int(t * max_x_offset)
            y1 = (HEIGHT - crop_h) // 2
            x2 = x1 + crop_w
            y2 = y1 + crop_h
            frame_pil = img_base.crop((x1, y1, x2, y2))
            
        elif scene["movement"] == "zoom_in_fast":
            zoom = 1.0 + 0.12 * (t ** 2)
            crop_w = int(WIDTH / zoom)
            crop_h = int(HEIGHT / zoom)
            x1 = (WIDTH - crop_w) // 2
            y1 = (HEIGHT - crop_h) // 2
            x2 = x1 + crop_w
            y2 = y1 + crop_h
            frame_pil = img_base.crop((x1, y1, x2, y2))
            
        elif scene["movement"] == "zoom_out":
            zoom = 1.12 - 0.12 * t
            crop_w = int(WIDTH / zoom)
            crop_h = int(HEIGHT / zoom)
            x1 = (WIDTH - crop_w) // 2
            y1 = (HEIGHT - crop_h) // 2
            x2 = x1 + crop_w
            y2 = y1 + crop_h
            frame_pil = img_base.crop((x1, y1, x2, y2))
            
        elif scene["movement"] == "pan_vertical":
            zoom = 1.12
            crop_w = int(WIDTH / zoom)
            crop_h = int(HEIGHT / zoom)
            max_y_offset = HEIGHT - crop_h
            x1 = (WIDTH - crop_w) // 2
            y1 = int((1 - t) * max_y_offset)
            x2 = x1 + crop_w
            y2 = y1 + crop_h
            frame_pil = img_base.crop((x1, y1, x2, y2))
            
        elif scene["movement"] == "zoom_in_up":
            zoom = 1.0 + 0.10 * t
            crop_w = int(WIDTH / zoom)
            crop_h = int(HEIGHT / zoom)
            max_y_offset = HEIGHT - crop_h
            x1 = (WIDTH - crop_w) // 2
            y1 = int((1 - t) * max_y_offset * 0.5)
            x2 = x1 + crop_w
            y2 = y1 + crop_h
            frame_pil = img_base.crop((x1, y1, x2, y2))
            
        elif scene["movement"] == "zoom_in_slow":
            zoom = 1.0 + 0.05 * t
            crop_w = int(WIDTH / zoom)
            crop_h = int(HEIGHT / zoom)
            x1 = (WIDTH - crop_w) // 2
            y1 = (HEIGHT - crop_h) // 2
            x2 = x1 + crop_w
            y2 = y1 + crop_h
            frame_pil = img_base.crop((x1, y1, x2, y2))
            
        else:
            frame_pil = img_base
            
        frame_pil = frame_pil.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
        
        # Desenha Legendas com Estética Aprimorada
        draw = ImageDraw.Draw(frame_pil, "RGBA")
        overlay_y1 = HEIGHT - 110
        draw.rectangle([(0, overlay_y1), (WIDTH, HEIGHT)], fill=(0, 0, 0, 130))
        
        try:
            font_sub = ImageFont.truetype("arial.ttf", 23)
        except IOError:
            font_sub = ImageFont.load_default()
        
        words = scene["subtitle"].split(" ")
        lines = []
        current_line = ""
        for word in words:
            test_line = current_line + " " + word if current_line else word
            try:
                left, top, right, bottom = draw.textbbox((0, 0), test_line, font=font_sub)
                line_width = right - left
            except AttributeError:
                line_width = draw.textsize(test_line, font=font_sub)[0]
                
            if line_width < WIDTH - 100:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word
        if current_line:
            lines.append(current_line)
            
        y_text_offset = overlay_y1 + (110 - len(lines) * 28) // 2
        for line in lines:
            try:
                left, top, right, bottom = draw.textbbox((0, 0), line, font=font_sub)
                w_l = right - left
            except AttributeError:
                w_l = draw.textsize(line, font=font_sub)[0]
            x_text = (WIDTH - w_l) // 2
            
            draw.text((x_text+1, y_text_offset+1), line, fill=(0, 0, 0, 180), font=font_sub)
            draw.text((x_text, y_text_offset), line, fill=(255, 255, 255, 255), font=font_sub)
            y_text_offset += 28
            
        frame_cv = cv2.cvtColor(np.array(frame_pil), cv2.COLOR_RGB2BGR)
        writer.write(frame_cv)
        
    writer.release()
    print(f"Cena {scene['id']} salva em: {output_path}")

def get_exact_video_paths(folder):
    files = os.listdir(folder)
    intro_path = None
    parcial_path = None
    resultado_path = None
    for f in files:
        f_low = f.lower()
        if f_low.startswith("introdu") and f_low.endswith(".mp4"):
            intro_path = os.path.join(folder, f)
        elif f_low.startswith("resultado parcial") and f_low.endswith(".mp4"):
            parcial_path = os.path.join(folder, f)
        elif f_low.startswith("resultado") and not "parcial" in f_low and f_low.endswith(".mp4"):
            resultado_path = os.path.join(folder, f)
    return intro_path, parcial_path, resultado_path

def normalize_audio_volume(clip, target_rms=0.070):
    if clip.audio is None:
        return clip
    try:
        arr = clip.audio.to_soundarray(fps=22050)
        rms = np.sqrt(np.mean(arr**2))
        if rms > 0.001:
            factor = target_rms / rms
            return clip.with_volume_scaled(factor)
    except Exception as e:
        print(f"Aviso de normalização de áudio: {e}")
    return clip

def compile_premium_campaign():
    project_media_dir = r"C:\Users\marce\.gemini\antigravity\scratch\modulo-gestao-parcerias\media"
    ref_folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    final_output = os.path.join(ref_folder, "VIDEO_CAMPANHA_INTEGRADO_80S.mp4")
    
    os.makedirs(project_media_dir, exist_ok=True)
    
    clean_music_path = os.path.join(project_media_dir, "ambient_music_bed.wav")
    if not os.path.exists(clean_music_path):
        print("Erro: Trilha sonora limpa não encontrada!")
        return

    intro_silent_path = os.path.join(project_media_dir, "intro_silent.mp4")
    parcial_silent_path = os.path.join(project_media_dir, "parcial_silent.mp4")
    resultado_silent_path = os.path.join(project_media_dir, "resultado_silent.mp4")
    
    if not (os.path.exists(intro_silent_path) and os.path.exists(parcial_silent_path) and os.path.exists(resultado_silent_path)):
        print("Erro: Arquivos silenciosos pré-renderizados não encontrados.")
        return
        
    print("\n[Passo 1] Carregando vídeos de referência silenciosos...")
    target_size = (1280, 720)
    
    clip_intro_full = VideoFileClip(intro_silent_path)
    clip_intro_B = clip_intro_full.subclipped(4.0, 8.0).resized(target_size)
    clip_parcial = VideoFileClip(parcial_silent_path).resized(target_size)
    clip_resultado = VideoFileClip(resultado_silent_path).resized(target_size)
    
    print("\n[Passo 2] Gerando cenas 2D com DURAÇÃO DINÂMICA ajustada à locução...")
    scenes_data = [1, 2, 3, 4, 5, 6]
    clips_com_locucao = []
    
    for idx in scenes_data:
        locucao_file = os.path.join(project_media_dir, f"locucao_cena_{idx}.mp3")
        voice_clip = AudioFileClip(locucao_file)
        
        # A duração da cena é exatamente a duração da voz + 1.5 segundos de margem de segurança
        scene_duration = voice_clip.duration + 1.5
        
        # Renderiza o vídeo com a duração correta para o arquivo
        video_path = os.path.join(project_media_dir, f"cena_{idx}_premium_dyn.mp4")
        create_animated_clip_video(SCENES[idx-1], video_path, scene_duration)
        
        # Carrega o vídeo gerado e atribui a locução iniciando aos 0.7s (0.2s após crossfade terminar)
        v_clip = VideoFileClip(video_path).resized(target_size).with_duration(scene_duration)
        delayed_voice = voice_clip.with_start(0.7)
        v_clip = v_clip.with_audio(delayed_voice)
        
        v_clip = normalize_audio_volume(v_clip, target_rms=0.080)
        clips_com_locucao.append(v_clip)
        
    print("\n[Passo 3] Montando linha do tempo visual dinâmica com crossfades de 0.5s...")
    raw_clips = [
        clips_com_locucao[0],  # Cena 1 (2D - Locução 1)
        clip_intro_B,          # 4s (Real B)
        clips_com_locucao[1],  # Cena 2 (2D - Locução 2)
        clip_parcial,          # 10s (Real - Mutado)
        clips_com_locucao[2],  # Cena 3 (2D - Locução 3)
        clips_com_locucao[3],  # Cena 4 (2D - Locução 4)
        clip_resultado,        # 10s (Real - Mutado)
        clips_com_locucao[4],  # Cena 5 (2D - Celebração)
        clips_com_locucao[5]   # Cena 6 (2D - Queima de fogos final)
    ]
    
    transition_time = 0.5
    composite_clips = []
    current_time = 0.0
    
    for i, clip in enumerate(raw_clips):
        if i == 0:
            positioned_clip = clip.with_start(0)
            current_time = clip.duration
        else:
            start_time = current_time - transition_time
            positioned_clip = clip.with_start(start_time).with_effects([CrossFadeIn(transition_time)])
            current_time = start_time + clip.duration
            
        composite_clips.append(positioned_clip)
        
    print("Processando vídeo composto final...")
    video_composite = CompositeVideoClip(composite_clips, size=target_size)
    total_duration = video_composite.duration
    
    print(f"\n[Passo 4] Mixando a Trilha Sonora Limpa global (Duração: {total_duration:.2f}s)...")
    global_bg_music = AudioFileClip(clean_music_path).subclipped(0, total_duration).with_volume_scaled(0.12)
    final_audio = CompositeAudioClip([video_composite.audio, global_bg_music])
    
    final_video = video_composite.with_audio(final_audio)
    final_video = normalize_audio_volume(final_video, target_rms=0.070)
    
    print(f"Renderizando em H.264 / AAC em: {final_output}...")
    final_video.write_videofile(
        final_output,
        codec="libx264",
        audio_codec="aac",
        fps=30
    )
    
    print("Limpando memória do sistema...")
    clip_intro_full.close()
    global_bg_music.close()
    for c in raw_clips:
        c.close()
    for c in composite_clips:
        c.close()
    final_video.close()
    
    print("\nVídeo integrado premium final com sincronização dinâmica gerado com sucesso!")

if __name__ == "__main__":
    compile_premium_campaign()
