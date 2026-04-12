import * as z from "zod";
console.log("z.email:", (z as any).email);
try {
    const schema = z.object({ email: (z as any).email() });
    console.log("schema created");
} catch (e) {
    if (e instanceof Error) {
        console.log("error:", e.message);
    } else {
        console.log("unknown error:", e);
    }
}
