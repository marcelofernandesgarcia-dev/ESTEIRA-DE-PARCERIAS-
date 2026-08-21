import os
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont
from moviepy import VideoFileClip, AudioFileClip

# Configurações das Cenas
SCENES = [
    {
        "id": 1,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_1_escuta_populacao_1784768968393.jpg",
        "title": "Cena 1: O Clamor da Comunidade",
        "subtitle": "Ouvir a populacao e o primeiro passo. O futuro e colaborativo!"
    },
    {
        "id": 2,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_2_planejamento_obras_1784769052165.jpg",
        "title": "Cena 2: Obrasgov.br",
        "subtitle": "Planejamento e fiscalizacao com o Obrasgov.br."
    },
    {
        "id": 3,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_3_desburocratizacao_1784769158016.jpg",
        "title": "Cena 3: Transferegov.br",
        "subtitle": "Mais eficiencia e menos papel com o Transferegov.br."
    },
    {
        "id": 4,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_4_contratos_controle_1784769242382.jpg",
        "title": "Cena 4: Contratos.gov.br",
        "subtitle": "Fiscalizacao de contratos em tempo real com o Contratos.gov.br."
    },
    {
        "id": 5,
        "image": r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc\cena_5_futuro_colaborativo_1784769326154.jpg",
        "title": "Cena 5: Futuro Colaborativo",
        "subtitle": "Rede de Parcerias: O futuro e colaborativo!"
    }
]

# Configurações do Vídeo
WIDTH = 1280
HEIGHT = 720
FPS = 30
DURATION_PER_SCENE = 12 # 12 segundos por cena x 5 = 60 segundos (1 minuto)

def make_temp_video(temp_video_path):
    print("Iniciando compilação do vídeo temporário...")
    fourcc = cv2.VideoWriter_fourcc(*'avc1') # H.264
    writer = cv2.VideoWriter(temp_video_path, fourcc, FPS, (WIDTH, HEIGHT))
    
    if not writer.isOpened():
        print("Erro: Não foi possível inicializar o gravador de vídeo (verifique OpenH264 DLL).")
        return False

    frames_per_scene = DURATION_PER_SCENE * FPS
    
    for idx, scene in enumerate(SCENES):
        image_path = scene["image"]
        title = scene["title"]
        subtitle = scene["subtitle"]
        
        print(f"Processando Cena {scene['id']}: {title}...")
        
        if not os.path.exists(image_path):
            print(f"Erro: Imagem {image_path} não encontrada!")
            writer.release()
            return False
            
        img_pil = Image.open(image_path).convert('RGB')
        
        # Crop e Redimensionamento para 16:9
        orig_w, orig_h = img_pil.size
        target_ratio = WIDTH / HEIGHT
        orig_ratio = orig_w / orig_h
        
        if orig_ratio > target_ratio:
            new_w = int(orig_h * target_ratio)
            offset = (orig_w - new_w) // 2
            img_cropped = img_pil.crop((offset, 0, offset + new_w, orig_h))
        else:
            new_h = int(orig_w / target_ratio)
            offset = (orig_h - new_h) // 2
            img_cropped = img_pil.crop((0, offset, orig_w, offset + new_h))
            
        img_base = img_cropped.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
        
        # Gera os frames da cena
        for i in range(frames_per_scene):
            t = i / (frames_per_scene - 1) if frames_per_scene > 1 else 0
            zoom_factor = 1.0 + 0.08 * t # Efeito Ken Burns sutil
            
            crop_w = int(WIDTH / zoom_factor)
            crop_h = int(HEIGHT / zoom_factor)
            
            x1 = (WIDTH - crop_w) // 2
            y1 = (HEIGHT - crop_h) // 2
            x2 = x1 + crop_w
            y2 = y1 + crop_h
            
            frame_pil = img_base.crop((x1, y1, x2, y2))
            frame_pil = frame_pil.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
            
            # Desenha elementos visuais
            draw = ImageDraw.Draw(frame_pil, "RGBA")
            
            # 1. Faixa preta semi-transparente para legenda
            overlay_y1 = HEIGHT - 120
            draw.rectangle([(0, overlay_y1), (WIDTH, HEIGHT)], fill=(0, 0, 0, 180))
            
            # 2. Título da cena no topo esquerdo
            draw.rectangle([(20, 20), (450, 60)], fill=(0, 51, 102, 220)) # Cor azul MGI
            try:
                font_title = ImageFont.truetype("arial.ttf", 20)
                font_sub = ImageFont.truetype("arial.ttf", 24)
            except IOError:
                font_title = ImageFont.load_default()
                font_sub = ImageFont.load_default()
                
            draw.text((35, 27), title, fill=(255, 255, 255, 255), font=font_title)
            
            # 3. Quebra e renderiza legenda
            words = subtitle.split(" ")
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
                
            y_text_offset = overlay_y1 + (120 - len(lines) * 30) // 2
            for line in lines:
                try:
                    left, top, right, bottom = draw.textbbox((0, 0), line, font=font_sub)
                    w_l = right - left
                except AttributeError:
                    w_l = draw.textsize(line, font=font_sub)[0]
                x_text = (WIDTH - w_l) // 2
                draw.text((x_text, y_text_offset), line, fill=(255, 255, 255, 255), font=font_sub)
                y_text_offset += 30
                
            # Escreve o quadro
            frame_cv = cv2.cvtColor(np.array(frame_pil), cv2.COLOR_RGB2BGR)
            writer.write(frame_cv)
            
    writer.release()
    print("Vídeo temporário gerado com sucesso.")
    return True

def merge_audio_video(temp_video_path, audio_path, output_path):
    print("Iniciando a sincronização do áudio com o vídeo...")
    try:
        video_clip = VideoFileClip(temp_video_path)
        audio_clip = AudioFileClip(audio_path)
        
        # Limita o áudio a 60 segundos para garantir a perfeita sincronia
        audio_clip = audio_clip.subclipped(0, 60)
        
        # Junta áudio e vídeo
        final_clip = video_clip.with_audio(audio_clip)
        
        # Salva o arquivo final
        print(f"Renderizando vídeo final H.264 sincronizado em: {output_path}...")
        final_clip.write_videofile(
            output_path,
            codec="libx264",
            audio_codec="aac",
            fps=FPS
        )
        
        # Fecha os clips para liberar memória
        video_clip.close()
        audio_clip.close()
        final_clip.close()
        print("Sincronização concluída com sucesso!")
        return True
    except Exception as e:
        print(f"Erro ao sincronizar áudio e vídeo: {e}")
        return False

if __name__ == "__main__":
    temp_video = "temp_video_60s.mp4"
    audio_locucao = r"C:\Users\marce\Videos\VIDEO PREFEITA\locucao_completa_1min.mp3"
    final_output = r"C:\Users\marce\Videos\VIDEO PREFEITA\VIDEO_PREFEITA_1MIN.mp4"
    
    if make_temp_video(temp_video):
        if merge_audio_video(temp_video, audio_locucao, final_output):
            print("Processo finalizado! Removendo arquivo temporário...")
            if os.path.exists(temp_video):
                os.remove(temp_video)
            print("Limpeza concluída. Vídeo pronto.")
        else:
            print("Falha na sincronização do áudio.")
    else:
        print("Falha na geração do vídeo temporário.")
