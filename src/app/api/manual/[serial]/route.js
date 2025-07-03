import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { serial } = params;
  const FOLDER_ID = process.env.NEXT_PUBLIC_ROOT_FOLDER_ID_MANUAL;
  const fileName = `${serial}.pdf`;

  const API_KEY = process.env.GOOGLE_API_KEY;
  const query =
    `name='${fileName}'+and+'${FOLDER_ID}'+in+parents+and+trashed=false`;
  const url =
    `https://www.googleapis.com/drive/v3/files` +
    `?q=${encodeURIComponent(query)}` +
    `&key=${API_KEY}` +
    `&fields=files(id,name)`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!data.files || data.files.length === 0) {
      return NextResponse.json(
        { error: 'Manual não encontrado para esse serial' },
        { status: 404 }
      );
    }

    const fileId = data.files[0].id;
    const downloadUrl =
      `https://drive.google.com/uc?export=download&id=${fileId}`;

    return NextResponse.json({ downloadUrl });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao buscar no Google Drive' },
      { status: 500 }
    );
  }
}