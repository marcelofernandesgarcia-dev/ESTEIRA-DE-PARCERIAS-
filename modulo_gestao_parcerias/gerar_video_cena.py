import os
import sys
import argparse
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont

def create_scene_video(image_path, output_path, subtitle, title="", duration=10, fps=30, width=1280, height=720):
    print(f"Lendo imagem de entrada: {image_path}")
    if not os.path.exists(image_path):
        print(f"Erro: Imagem {image_path} não existe!")
        return False

    # Carrega a imagem com PIL para garantir compatibilidade e manipulação de cores
    img_pil = Image.open(image_path).convert('RGB')
    
    # Redimensiona/Corta a imagem original para a proporção 16:9 (width x height)
    orig_w, orig_h = img_pil.size
    target_ratio = width / height
    orig_ratio = orig_w / orig_h
    
    if orig_ratio > target_ratio:
        # A imagem original é mais larga, corta as laterais
        new_w = int(orig_h * target_ratio)
        offset = (orig_w - new_w) // 2
        img_cropped = img_pil.crop((offset, 0, offset + new_w, orig_h))
    else:
        # A imagem original é mais alta, corta o topo e o rodapé
        new_h = int(orig_w / target_ratio)
        offset = (orig_h - new_h) // 2
        img_cropped = img_pil.crop((0, offset, orig_w, offset + new_h))
        
    img_base = img_cropped.resize((width, height), Image.Resampling.LANCZOS)
    
    # Prepara o gravador de vídeo do OpenCV
    # Usaremos o codec avc1 (H.264) para máxima compatibilidade com navegadores e reprodutores modernos
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    
    # Garante que a pasta de destino do output existe
    output_dir = os.path.dirname(output_path)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir, exist_ok=True)
        
    writer = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    if not writer.isOpened():
        print(f"Erro ao abrir VideoWriter para {output_path}")
        return False
        
    total_frames = duration * fps
    print(f"Gravando {total_frames} quadros em {output_path} ({width}x{height} @ {fps} fps)...")
    
    for i in range(total_frames):
        # Fator de zoom varia suavemente de 1.0 a 1.08 usando interpolação linear
        t = i / (total_frames - 1) if total_frames > 1 else 0
        zoom_factor = 1.0 + 0.08 * t
        
        # Calcula a área de corte baseada no zoom
        crop_w = int(width / zoom_factor)
        crop_h = int(height / zoom_factor)
        
        x1 = (width - crop_w) // 2
        y1 = (height - crop_h) // 2
        x2 = x1 + crop_w
        y2 = y1 + crop_h
        
        # Corta e redimensiona
        frame_pil = img_base.crop((x1, y1, x2, y2))
        frame_pil = frame_pil.resize((width, height), Image.Resampling.LANCZOS)
        
        # Desenha a legenda e elementos textuais
        draw = ImageDraw.Draw(frame_pil, "RGBA")
        
        # 1. Faixa preta semi-transparente no rodapé para a legenda
        overlay_y1 = height - 120
        draw.rectangle([(0, overlay_y1), (width, height)], fill=(0, 0, 0, 180))
        
        # 2. Caixa para o título no topo esquerdo (opcional)
        if title:
            draw.rectangle([(20, 20), (450, 60)], fill=(0, 51, 102, 220)) # Cor azul-escuro MGI
            # Desenha texto do título
            try:
                # Tenta usar uma fonte padrão do Windows se disponível
                font_title = ImageFont.truetype("arial.ttf", 20)
            except IOError:
                font_title = ImageFont.load_default()
            draw.text((35, 27), title, fill=(255, 255, 255, 255), font=font_title)
            
        # 3. Desenha a Legenda
        try:
            font_sub = ImageFont.truetype("arial.ttf", 24)
        except IOError:
            font_sub = ImageFont.load_default()
            
        # Quebra o texto da legenda se for muito longo
        words = subtitle.split(" ")
        lines = []
        current_line = ""
        for word in words:
            test_line = current_line + " " + word if current_line else word
            # Tenta medir a largura da linha
            try:
                left, top, right, bottom = draw.textbbox((0, 0), test_line, font=font_sub)
                line_width = right - left
            except AttributeError:
                # Fallback para versões antigas do Pillow
                line_width = draw.textsize(test_line, font=font_sub)[0]
                
            if line_width < width - 100:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word
        if current_line:
            lines.append(current_line)
            
        # Desenha cada linha centralizada no rodapé
        y_text_offset = overlay_y1 + (120 - len(lines) * 30) // 2
        for line in lines:
            try:
                left, top, right, bottom = draw.textbbox((0, 0), line, font=font_sub)
                w_l = right - left
            except AttributeError:
                w_l = draw.textsize(line, font=font_sub)[0]
                
            x_text = (width - w_l) // 2
            draw.text((x_text, y_text_offset), line, fill=(255, 255, 255, 255), font=font_sub)
            y_text_offset += 30
            
        # Converte o frame do formato RGB do PIL para BGR do OpenCV
        frame_cv = cv2.cvtColor(np.array(frame_pil), cv2.COLOR_RGB2BGR)
        writer.write(frame_cv)
        
    writer.release()
    print(f"Vídeo salvo com sucesso em: {output_path}")
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Gera vídeo MP4 a partir de imagem com zoom e legendas.")
    parser.add_argument("--image", required=True, help="Caminho da imagem de entrada")
    parser.add_argument("--output", required=True, help="Caminho do vídeo de saída")
    parser.add_argument("--subtitle", required=True, help="Texto da legenda")
    parser.add_argument("--title", default="", help="Título da cena")
    parser.add_argument("--duration", type=int, default=10, help="Duração em segundos")
    parser.add_argument("--fps", type=int, default=30, help="Taxa de quadros por segundo")
    
    args = parser.parse_args()
    
    success = create_scene_video(
        image_path=args.image,
        output_path=args.output,
        subtitle=args.subtitle,
        title=args.title,
        duration=args.duration,
        fps=args.fps
    )
    
    if not success:
        sys.exit(1)
