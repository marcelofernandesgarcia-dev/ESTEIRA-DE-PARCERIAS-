import os
from moviepy import VideoFileClip, AudioFileClip, concatenate_videoclips

def find_file_starting_with(folder, prefix):
    for f in os.listdir(folder):
        if f.lower().startswith(prefix.lower()) and f.lower().endswith(".mp4"):
            return os.path.join(folder, f)
    raise FileNotFoundError(f"Nenhum arquivo .mp4 começando com '{prefix}' foi encontrado na pasta {folder}")

def integrate_campaign_video():
    project_media_dir = r"C:\Users\marce\.gemini\antigravity\scratch\modulo-gestao-parcerias\media"
    ref_folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    output_path = os.path.join(ref_folder, "VIDEO_CAMPANHA_INTEGRADO_80S.mp4")
    
    print("Localizando arquivos de vídeo e áudio...")
    
    # Localizando os vídeos de referência da prefeita
    # Evitando erros de encoding com busca dinâmica do prefixo
    intro_path = find_file_starting_with(ref_folder, "INTRODU")
    parcial_path = find_file_starting_with(ref_folder, "RESULTADO PARCIAL")
    resultado_path = find_file_starting_with(ref_folder, "RESULTADO")
    
    print(f"Vídeo de Introdução: {os.path.basename(intro_path)}")
    print(f"Vídeo de Resultado Parcial: {os.path.basename(parcial_path)}")
    print(f"Vídeo de Resultado Final: {os.path.basename(resultado_path)}")
    
    # Definindo as cenas individuais e seus respectivos áudios
    scenes_data = [
        {"id": 1, "video": "cena_1.mp4", "audio": "locucao_cena_1.mp3"},
        {"id": 2, "video": "cena_2.mp4", "audio": "locucao_cena_2.mp3"},
        {"id": 3, "video": "cena_3.mp4", "audio": "locucao_cena_3.mp3"},
        {"id": 4, "video": "cena_4.mp4", "audio": "locucao_cena_4.mp3"},
        {"id": 5, "video": "cena_5.mp4", "audio": "locucao_cena_5.mp3"}
    ]
    
    # Redimensionamento padrão
    target_size = (1280, 720)
    
    print("Carregando e processando os clipes...")
    
    # 1. Carrega Introdução (Mantém áudio original)
    clip_intro = VideoFileClip(intro_path).resized(target_size)
    
    # 2. Carrega Cenas 1 e 2
    cena_1_video = os.path.join(project_media_dir, scenes_data[0]["video"])
    cena_1_audio = os.path.join(project_media_dir, scenes_data[0]["audio"])
    clip_cena1 = VideoFileClip(cena_1_video).with_audio(AudioFileClip(cena_1_audio)).with_duration(10.0).resized(target_size)
    
    cena_2_video = os.path.join(project_media_dir, scenes_data[1]["video"])
    cena_2_audio = os.path.join(project_media_dir, scenes_data[1]["audio"])
    clip_cena2 = VideoFileClip(cena_2_video).with_audio(AudioFileClip(cena_2_audio)).with_duration(10.0).resized(target_size)
    
    # 3. Carrega Resultado Parcial (Mantém áudio original)
    clip_parcial = VideoFileClip(parcial_path).resized(target_size)
    
    # 4. Carrega Cenas 3 e 4
    cena_3_video = os.path.join(project_media_dir, scenes_data[2]["video"])
    cena_3_audio = os.path.join(project_media_dir, scenes_data[2]["audio"])
    clip_cena3 = VideoFileClip(cena_3_video).with_audio(AudioFileClip(cena_3_audio)).with_duration(10.0).resized(target_size)
    
    cena_4_video = os.path.join(project_media_dir, scenes_data[3]["video"])
    cena_4_audio = os.path.join(project_media_dir, scenes_data[3]["audio"])
    clip_cena4 = VideoFileClip(cena_4_video).with_audio(AudioFileClip(cena_4_audio)).with_duration(10.0).resized(target_size)
    
    # 5. Carrega Resultado Final (Mantém áudio original)
    clip_resultado = VideoFileClip(resultado_path).resized(target_size)
    
    # 6. Carrega Cena 5
    cena_5_video = os.path.join(project_media_dir, scenes_data[4]["video"])
    cena_5_audio = os.path.join(project_media_dir, scenes_data[4]["audio"])
    clip_cena5 = VideoFileClip(cena_5_video).with_audio(AudioFileClip(cena_5_audio)).with_duration(10.0).resized(target_size)
    
    # Lista de clipes na ordem sequencial da história
    clips = [
        clip_intro,      # 00:00 - 00:10
        clip_cena1,      # 00:10 - 00:20
        clip_cena2,      # 00:20 - 00:30
        clip_parcial,    # 00:30 - 00:40
        clip_cena3,      # 00:40 - 00:50
        clip_cena4,      # 00:50 - 01:00
        clip_resultado,  # 01:00 - 01:10
        clip_cena5       # 01:10 - 01:20
    ]
    
    print("Concatenando todos os clipes da linha do tempo...")
    final_clip = concatenate_videoclips(clips, method="compose")
    
    print(f"Renderizando vídeo integrado final H.264 (80s) em: {output_path}...")
    final_clip.write_videofile(
        output_path,
        codec="libx264",
        audio_codec="aac",
        fps=30
    )
    
    # Liberando memória
    for c in clips:
        c.close()
    final_clip.close()
    
    print("Vídeo integrado compilado e salvo com sucesso!")

if __name__ == "__main__":
    integrate_campaign_video()
