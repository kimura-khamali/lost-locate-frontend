const baseURL = process.env.BASE_URL;

export async function GET() {
    try{
        const response = await fetch(`${baseURL}/api/missing_persons`);
        const data = await response.json();

        return new Response(JSON.stringify(data),{
            status:200,
        });
    } catch (error){
      const errors = (error as Error).message
      console.log({errors});
      
        return new Response((error as Error).message,{
            status:500
        });
    }
    
}