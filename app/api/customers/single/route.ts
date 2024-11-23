import { NextRequest, NextResponse } from "next/server";
import { getSingleInvoice } from "@/app/db/actions";

export async function GET(req: NextRequest) {
   const invoiceID = req.nextUrl.searchParams.get("id");
    
   if (invoiceID === null) {
       return NextResponse.json(
           { message: "Invoice ID is required" },
           { status: 400 }
       );
   }

   try {
       const invoice = await getSingleInvoice(Number(invoiceID));
       return NextResponse.json({ message: "Invoice retrieved successfully!", invoice }, { status: 200 });
   } catch (err) {
       return NextResponse.json(
           { message: "An error occurred", err },
           { status: 400 }
       );
   }
}