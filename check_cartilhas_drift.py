import os
import re
from datetime import datetime

INDEX_PATH = r"C:\Users\marce\Documents\antigravity\charming-einstein\landing_transferegov\index.html"
CARTILHA_PATH = r"C:\Users\marce\Documents\antigravity\charming-einstein\landing_transferegov\cartilha.html"
REPORT_PATH = r"C:\Users\marce\.gemini\antigravity\brain\6546de2d-7c02-4002-a9ac-804d57ebba80\relatorio_drift_cartilha.txt"

def run_drift_check():
    today = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    if not os.path.exists(INDEX_PATH) or not os.path.exists(CARTILHA_PATH):
        print("Erro: Arquivos para comparação não encontrados.")
        return

    with open(INDEX_PATH, "r", encoding="utf-8") as f:
        index_html = f.read()

    with open(CARTILHA_PATH, "r", encoding="utf-8") as f:
        cartilha_html = f.read()

    # Extract all chapters from the index.html modal reader
    # e.g., <button class="report-chapter-header" ...>⚡ 1. Sumário Executivo <span>▾</span></button>
    index_chapters = re.findall(r'class="report-chapter-header"[^>]*>(.*?)<span', index_html)
    index_chapters = [c.strip() for c in index_chapters]

    # Extract all chapters from the cartilha.html print template
    # e.g., <h2 class="section-heading">Sumário Executivo</h2>
    raw_cartilha_chapters = re.findall(r'h2 class="section-heading">(.*?)</h2>', cartilha_html)
    cartilha_chapters = [
        c.strip() for c in raw_cartilha_chapters 
        if "gloss" not in c.strip().lower()
    ]

    high_priority = []
    medium_priority = []
    low_priority = []

    # 1. Structural differences
    if len(index_chapters) != len(cartilha_chapters):
        high_priority.append(
            f"Diferença na quantidade de seções! Landing Page tem {len(index_chapters)} seções, enquanto a Cartilha tem {len(cartilha_chapters)}."
        )

    # 2. Content differences
    for i, idx_title in enumerate(index_chapters):
        clean_idx = re.sub(r'^[^\w]*\d+[\.\s\-]*', '', idx_title).strip().lower()
        matched = False
        for cart_title in cartilha_chapters:
            clean_cart = re.sub(r'^[^\w]*\d+[\.\s\-]*', '', cart_title).strip().lower()
            if clean_idx == clean_cart:
                matched = True
                break
        if not matched:
            high_priority.append(f"Seção da Landing Page '{idx_title}' não encontrada na Cartilha de impressão.")

    for cart_title in cartilha_chapters:
        clean_cart = re.sub(r'^[^\w]*\d+[\.\s\-]*', '', cart_title).strip().lower()
        matched = False
        for idx_title in index_chapters:
            clean_idx = re.sub(r'^[^\w]*\d+[\.\s\-]*', '', idx_title).strip().lower()
            if clean_idx == clean_cart:
                matched = True
                break
        if not matched:
            medium_priority.append(f"Seção da Cartilha '{cart_title}' não correspondida na Landing Page.")

    # 3. Check for specific Gov.br styles in cartilha.html
    if "font-family: var(--font-main);" not in cartilha_html or "Verdana" not in cartilha_html:
        high_priority.append("Fonte institucional Verdana não está aplicada corretamente na Cartilha.")

    if "--gov-blue-warm-vivid-60" not in cartilha_html:
        high_priority.append("Paleta oficial Gov.br (--gov-blue-warm-vivid-60) não foi detectada na Cartilha.")

    # Prepare drift report
    report_lines = [
        f"RELATÓRIO DE AUTO-ANÁLISE — {today}",
        "PRIORIDADE ALTA:"
    ]
    if high_priority:
        for item in high_priority:
            report_lines.append(f"• {item}")
    else:
        report_lines.append("• Nenhum drift crítico de alta prioridade detectado.")

    report_lines.append("\nPRIORIDADE MÉDIA:")
    if medium_priority:
        for item in medium_priority:
            report_lines.append(f"• {item}")
    else:
        report_lines.append("• Nenhum drift de média prioridade detectado.")

    report_lines.append("\nPRIORIDADE BAIXA:")
    if low_priority:
        for item in low_priority:
            report_lines.append(f"• {item}")
    else:
        report_lines.append("• Nenhum ajuste menor pendente.")

    if high_priority or medium_priority:
        action = "Recomendada execução de 'python sync_cartilhas.py' para sincronizar e recompilar a Cartilha com os novos textos da Landing Page."
    else:
        action = "Estrutura e conteúdo 100% consistentes. Nenhuma ação necessária."
    report_lines.append(f"\nAÇÃO RECOMENDADA: {action}")

    report_text = "\n".join(report_lines)
    
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        f.write(report_text)
        
    print("Drift report successfully generated at brain/relatorio_drift_cartilha.txt!")
    print(report_text.encode('ascii', errors='replace').decode('ascii'))

if __name__ == '__main__':
    run_drift_check()
