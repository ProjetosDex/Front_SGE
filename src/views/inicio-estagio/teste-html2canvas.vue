<!doctype html>
<html>
  <head>
    <title>Gerar PDF com jsPDF e html2canvas</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <style>
      .pdf-content {
        margin: 20px;
        padding: 20px;
        border: 1px solid #ccc;
      }
      .pdf-content h2 {
        color: blue;
      }
      .pdf-content p {
        font-size: 16px;
        font-style: italic;
      }
      .styled-div {
        background-color: lightgray;
        padding: 10px;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div id="content" class="pdf-content">
      <h2>Título do Documento</h2>
      <p>Este é um parágrafo de exemplo com estilos.</p>
      <p>Outro parágrafo com estilo itálico.</p>
      <div class="styled-div">
        <p>Conteúdo em um div estilizado.</p>
      </div>
    </div>
    <button onclick="generateAndShowPDF()">Gerar e Exibir PDF</button>

    <script>
      async function generateAndShowPDF() {
        const { jsPDF } = window.jspdf;

        // Captura o conteúdo HTML usando html2canvas
        html2canvas(document.getElementById('content'))
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');

            // Cria um novo documento PDF
            const doc = new jsPDF();

            // Adiciona a imagem ao PDF
            doc.addImage(imgData, 'PNG', 10, 10);

            // Abre o PDF no visualizador de PDF do navegador
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank');

            // Limpa a URL após 10 segundos para liberar recursos
            setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);
          })
          .catch((error) => {
            console.error('Erro ao gerar PDF:', error);
          });
      }
    </script>
  </body>
</html>
