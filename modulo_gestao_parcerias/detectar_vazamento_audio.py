import os
import numpy as np
from moviepy import VideoFileClip, AudioFileClip

def main():
    video_folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    final_video_path = os.path.join(video_folder, "VIDEO_CAMPANHA_INTEGRADO_80S.mp4")
    
    if not os.path.exists(final_video_path):
        print("Erro: Vídeo final não encontrado.")
        return
        
    # Localiza RESULTADO.mp4
    resultado_path = None
    for f in os.listdir(video_folder):
        if f.lower().startswith("resultado") and not "parcial" in f.lower() and f.lower().endswith(".mp4"):
            resultado_path = os.path.join(video_folder, f)
            break
            
    if not resultado_path:
        print("Erro: Não localizou RESULTADO.mp4")
        return
        
    print(f"Vídeo Final: {final_video_path}")
    print(f"Vídeo Referência: {resultado_path}")
    
    # Carrega os áudios
    clip_final = VideoFileClip(final_video_path)
    clip_ref = VideoFileClip(resultado_path)
    
    if clip_ref.audio is None:
        print("RESULTADO.mp4 não tem áudio.")
        return
        
    fps = 22050
    # Extrai áudio de RESULTADO.mp4 (10 segundos)
    arr_ref = clip_ref.audio.to_soundarray(fps=fps)
    # Extrai o áudio do vídeo final de 50s a 60s (período onde entra RESULTADO.mp4)
    # No vídeo final, RESULTADO.mp4 começa por volta de 51s e vai até 61s
    arr_final_segment = clip_final.audio.subclipped(51.0, 61.0).to_soundarray(fps=fps)
    
    # Garante o mesmo comprimento
    min_len = min(len(arr_ref), len(arr_final_segment))
    arr_ref = arr_ref[:min_len, 0] # Canal esquerdo
    arr_final_segment = arr_final_segment[:min_len, 0] # Canal esquerdo
    
    # Calcula a correlação cruzada normalizada para ver se o áudio original de RESULTADO.mp4 está presente
    # Primeiro removemos a trilha sonora sintética limpa subtraindo do sinal final? 
    # Ou simplesmente fazemos correlação de Pearson direta.
    correlation = np.corrcoef(arr_ref, arr_final_segment)[0, 1]
    
    print(f"\nCorrelação entre áudio original de RESULTADO.mp4 e segmento final (51-61s): {correlation:.2%}")
    if abs(correlation) > 0.05:
        print("⚠️ ALERTA: Detectado vazamento do áudio de RESULTADO.mp4 no vídeo final!")
    else:
        print("✅ Áudio de RESULTADO.mp4 está devidamente silenciado/ausente.")
        
    # E quanto a RESULTADO PARCIAL.mp4 de 24s a 34s?
    # Vamos verificar também!
    parcial_path = None
    for f in os.listdir(video_folder):
        if f.lower().startswith("resultado parcial") and f.lower().endswith(".mp4"):
            parcial_path = os.path.join(video_folder, f)
            break
    if parcial_path:
        clip_parcial = VideoFileClip(parcial_path)
        arr_parcial = clip_parcial.audio.to_soundarray(fps=fps)
        arr_final_parcial = clip_final.audio.subclipped(24.0, 34.0).to_soundarray(fps=fps)
        min_len = min(len(arr_parcial), len(arr_final_parcial))
        arr_parcial = arr_parcial[:min_len, 0]
        arr_final_parcial = arr_final_parcial[:min_len, 0]
        corr_parcial = np.corrcoef(arr_parcial, arr_final_parcial)[0, 1]
        print(f"Correlação para RESULTADO PARCIAL.mp4 (24-34s): {corr_parcial:.2%}")
        if abs(corr_parcial) > 0.05:
            print("⚠️ ALERTA: Detectado vazamento do áudio de RESULTADO PARCIAL.mp4 no vídeo final!")
        else:
            print("✅ Áudio de RESULTADO PARCIAL.mp4 está devidamente silenciado.")
            
    clip_final.close()
    clip_ref.close()

if __name__ == "__main__":
    main()
