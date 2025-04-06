"use server";
import fs from "fs";
import path from "path";

type HandlerMeta = {
    name: string;
    module: string;
    params: string[]; // e.g., ["userId", "id"]
    method: "GET" | "POST" | "PUT" | "DELETE";
};

export const AutomatedRoutes = async () => {
    const handlers: HandlerMeta[] = [
        // Transfer
        {
            name: "getTransfer",
            module: "transfer",
            params: ["userId", "id"],
            method: "GET",
        },
        {
            name: "getUserTransfer",
            module: "transfer",
            params: ["userId"],
            method: "GET",
        },
        { name: "getAllTransfer", module: "transfer", params: [], method: "GET" },
        {
            name: "setTransfer",
            module: "transfer",
            params: ["data"],
            method: "POST",
        },
        {
            name: "updateTransfer",
            module: "transfer",
            params: ["userId", "id", "data"],
            method: "PUT",
        },
        {
            name: "deleteTransfer",
            module: "transfer",
            params: ["userId", "id"],
            method: "DELETE",
        },

        // Transaction
        {
            name: "getTransaction",
            module: "transaction",
            params: ["userId", "id"],
            method: "GET",
        },
        {
            name: "getUserTransaction",
            module: "transaction",
            params: ["userId"],
            method: "GET",
        },
        {
            name: "getAllTransaction",
            module: "transaction",
            params: [],
            method: "GET",
        },
        {
            name: "setTransaction",
            module: "transaction",
            params: ["data"],
            method: "POST",
        },
        {
            name: "updateTransaction",
            module: "transaction",
            params: ["userId", "id", "data"],
            method: "PUT",
        },
        {
            name: "deleteTransaction",
            module: "transaction",
            params: ["userId", "id"],
            method: "DELETE",
        },

        // License
        {
            name: "getLicense",
            module: "license",
            params: ["userId", "id"],
            method: "GET",
        },
        {
            name: "getUserLicense",
            module: "license",
            params: ["userId"],
            method: "GET",
        },
        { name: "getAllLicense", module: "license", params: [], method: "GET" },
        { name: "setLicense", module: "license", params: ["data"], method: "POST" },
        {
            name: "updateLicense",
            module: "license",
            params: ["userId", "id", "data"],
            method: "PUT",
        },
        {
            name: "deleteLicense",
            module: "license",
            params: ["userId", "id"],
            method: "DELETE",
        },

        // User
        { name: "getUser", module: "user", params: ["id"], method: "GET" },
        { name: "getAllUsers", module: "user", params: [], method: "GET" },
        { name: "setUser", module: "user", params: ["data"], method: "POST" },
        {
            name: "updateUser",
            module: "user",
            params: ["id", "data"],
            method: "PUT",
        },
        { name: "deleteUser", module: "user", params: ["id"], method: "DELETE" },
    ];

    const baseDir = "app/api/endpoints/database";

    handlers.forEach(({ name, module, params, method }) => {
        const dir = path.join(baseDir, module, name);
        const file = path.join(dir, "route.ts");

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const methodName = method.toUpperCase();

        const setParams =
            params.length > 0
                ? `const {${params.join(", ")}} = await req.json()`
                : "";

        const code = `
  import { ${name} } from "@/app/actions/database";
  import { NextResponse } from "next/server";
  
  export async function ${methodName}(req: Request) {
    try {    
         ${setParams}
      const result = await ${name}(${params.join(", ")});
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }  `.trim();

        fs.writeFileSync(file, code);
        console.log(`✅ Created: ${file}`);
    });
};
