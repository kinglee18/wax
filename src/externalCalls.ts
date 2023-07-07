import { AddProduct, WTOrder } from "./interfaces";

interface FormResponse {
    status: string;
    data: any;
  }
  
  const wtfApi = "https://api.whataform.com";
  const wsecret = "f1fb6955b810ba64ce5e1a979!.21e98b0d79c73beb6135a919b146847f0843892f;"
  export async function fetchFields(): Promise<FormResponse> {
    const key = 'wtfm-8705207c72!.d02a4ca0633d26ba290de204de1fa970f6a821f7';
    const code = 'b10fc38d1a59d9';
    const response = await fetch(`${wtfApi}/v1/form?key=${key}&code=${code}`, {
        headers: {
            wsecret
        }
    });
    return await response.json();
  }
  
  const formURL = "https://wax710novum.whataform.com/api/f/b10fc38d1a59d9";

  export async function postData(payload: AddProduct): Promise<FormResponse> {
    const response = await fetch(formURL + "/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    return response.json();
  }
  

export async function postForm(payload: WTOrder): Promise<FormResponse> {
    const response = await fetch(formURL + "/sendorder", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarycTBJA37JCWjIQFkV",
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error("Failed to post data");
    }
  
    return response.json();
  }