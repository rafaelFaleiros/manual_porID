import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { serial } = params;
  // ID da pasta que contém só os manuais (ex: '1XBux1qj1Aw2lppnknwfBade2lDRGM4Of')
  const FOLDER_ID = process.env.NEXT_PUBLIC_ROOT_FOLDER_ID_MANUAL;
  const fileName = `${serial}.pdf`;  

  // Constroi a query com espaços e operadores exatamente como a API exige
  const query = `name = '${fileName}' and '${FOLDER_ID}' in parents and trashed = false`;

  const API_KEY = process.env.GOOGLE_API_KEY;
  const url =
    `https://www.googleapis.com/drive/v3/files` +
    `?q=${encodeURIComponent(query)}` +
    `&key=${API_KEY}` +
    `&fields=files(id,name)`;

  console.log('Drive query URL:', url);  // => Cheque no log do servidor se a URL está correta

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Se não encontrou nada, retorna 404
    if (!data.files || data.files.length === 0) {
      return NextResponse.json(
        { error: 'Manual não encontrado para esse serial' },
        { status: 404 }
      );
    }

    // Pega o primeiro arquivo encontrado
    const fileId = data.files[0].id;
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    return NextResponse.json({ downloadUrl });
  } catch (err) {
    console.error('Erro na chamada ao Drive API:', err);
    return NextResponse.json(
      { error: 'Erro ao buscar no Google Drive' },
      { status: 500 }
    );
  }
}
