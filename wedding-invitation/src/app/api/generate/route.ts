
import { validateCardInput } from '@/lib/validation';
import { generateWeddingScene } from '@/lib/ai';


import { storeCard, cardExists } from '@/lib/storage';



export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
@@ -24,12 +28,12 @@ export async function POST(request: NextRequest) {
      url: `/card/${cardId}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate invitation',
      },
      { status: 400 }
    );
  }
}
