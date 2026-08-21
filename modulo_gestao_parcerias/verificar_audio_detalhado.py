import os
import numpy as np
from moviepy import VideoFileClip, AudioFileClip

def main():
    video_folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    final_video_path = os.path.join(video_folder, "VIDEO_CAMPANHA_INTEGRADO_80S.mp4")
    log_path = r"C:\Users\marce\.gemini\antigravity\scratch\verificacao_audio_detalhada.log"
    
    with open(log_path, "w", encoding="utf-8") as log:
        log.write("=== Verificação Detalhada de Áudio ===\n\n")
        
        if not os.path.exists(final_video_path):
            log.write("Erro: Vídeo final não encontrado.\n")
            return
            
        # Encontra caminhos exatos
        intro_path = None
        parcial_path = None
        resultado_path = None
        for f in os.listdir(video_folder):
            f_low = f.lower()
            if f_low.startswith("introdu") and f_low.endswith(".mp4"):
                intro_path = os.path.join(video_folder, f)
            elif f_low.startswith("resultado parcial") and f_low.endswith(".mp4"):
                parcial_path = os.path.join(video_folder, f)
            elif f_low.startswith("resultado") and not "parcial" in f_low and f_low.endswith(".mp4"):
                resultado_path = os.path.join(video_folder, f)
                
        log.write(f"INTRODUÇÃO Path: {intro_path}\n")
        log.write(f"RESULTADO PARCIAL Path: {parcial_path}\n")
        log.write(f"RESULTADO Path: {resultado_path}\n\n")
        
        # Carrega os áudios
        clip_final = VideoFileClip(final_video_path)
        fps = 22050
        
        # Verifica correlações para cada um dos vídeos de referência em relação ao vídeo final
        for name, path, start_t, end_t in [
            ("INTRODUÇÃO (Segmento B)", intro_path, 15.4, 19.4),
            ("RESULTADO PARCIAL", parcial_path, 34.78, 44.79),
            ("RESULTADO", resultado_path, 73.87, 83.88)
        ]:
            if path and os.path.exists(path):
                clip_ref = VideoFileClip(path)
                if clip_ref.audio is not None:
                    arr_ref = clip_ref.audio.to_soundarray(fps=fps)
                    arr_final = clip_final.audio.subclipped(start_t, end_t).to_soundarray(fps=fps)
                    min_len = min(len(arr_ref), len(arr_final))
                    
                    # Correlação
                    corr = np.corrcoef(arr_ref[:min_len, 0], arr_final[:min_len, 0])[0, 1]
                    log.write(f"Correlação para {name} ({start_t}s a {end_t}s): {corr:.2%}\n")
                    if abs(corr) > 0.05:
                        log.write(f"⚠️ AVISO: Áudio do vídeo {name} VAZOU no vídeo final!\n")
                    else:
                        log.write(f"✅ OK: Áudio do vídeo {name} está mutado no vídeo final.\n")
                else:
                    log.write(f"Vídeo {name} não tem faixa de áudio.\n")
            else:
                log.write(f"Caminho não encontrado para {name}: {path}\n")
                
        clip_final.close()
        log.write("\n=== Fim da Verificação ===\n")
        
    print("Verificação detalhada salva em verificacao_audio_detalhada.log")

if __name__ == "__main__":
    main()
