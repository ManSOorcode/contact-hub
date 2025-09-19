import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { revalidateTag } from "next/cache";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const contacts = await Contact.findById(params.id);
    if (!contacts)
      return Response.json({ error: "Contacts not found" }, { status: 404 });
    const payloade = { success: true, data: contacts };
    return Response.json(payloade);
  } catch (error: unknown) {
    return Response.json(
      { error: "Internal server error", message: error },
      { status: 500 }
    );
  }
};

// PUT: Update user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await request.json();

  try {
    const updatedContact = await Contact.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    revalidateTag("changes");

    const payloade = {
      success: true,
      data: updatedContact,
    };
    return Response.json({ ...payloade }, { status: 202 });
  } catch (error: unknown) {
    return Response.json(
      { error: "Internal server error", message: error },
      { status: 500 }
    );
  }
}

// DELETE: Remove user
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const deleteContact = await Contact.findByIdAndDelete(params.id);
    if (!deleteContact)
      return Response.json({ error: "User not found" }, { status: 404 });
    revalidateTag("changes");
    return Response.json({ message: "User deleted" });
  } catch (error: unknown) {
    return Response.json(
      { error: "Internal server error", message: error },
      { status: 500 }
    );
  }
}
