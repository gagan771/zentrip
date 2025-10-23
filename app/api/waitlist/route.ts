import { Client, Databases } from 'appwrite';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    const databases = new Databases(client);

    // Replace these with your actual database and collection IDs from Appwrite console
    const databaseId = 'your-database-id'; // e.g., 'waitlist-db'
    const collectionId = 'your-collection-id'; // e.g., 'emails'

    const response = await databases.createDocument(
      databaseId,
      collectionId,
      'unique()', // Auto-generate ID
      { email, createdAt: new Date().toISOString() }
    );

    return NextResponse.json({ message: 'Added to waitlist', data: response });
  } catch (error: any) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}