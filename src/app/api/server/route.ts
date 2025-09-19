import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { revalidateTag } from "next/cache";

interface RequestData {
  name: string;

  title: string;
  location: string;
  phone: number;
  email: string;
  urls: string[];
}

interface ResponseBody {
  success: boolean;
  data?: RequestData[];
  message?: string;
  status?: number;
}

export const GET = async () => {
  console.log("API is running");
  await connectDB();

  const users = await Contact.find();

  const payloade: ResponseBody = { success: true, data: users };
  return Response.json(payloade);
};

export const POST = async (request: Request) => {
  const data = await request.json();
  console.log("Data received:", data);

  await connectDB();
  try {
    const newContact = new Contact(data);
    await newContact.save();
    revalidateTag("changes");
    const payloade: ResponseBody = {
      success: true,
      status: 201,
      message: "Data received and saved successfully",
    };
    return Response.json(payloade);
  } catch (error) {
    const payloade: ResponseBody = {
      success: false,
      status: 500,
      message: `Error saving data: ${error}`,
    };
    return Response.json(payloade);
  }
  // return new Response(
  //   JSON.stringify({ message: "Data received successfully", data }),
  //   {
  //     status: 200,
  //     headers: { "Content-Type": "application/json" },
  //   }
  // );
};
