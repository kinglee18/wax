import { addProduct, fetchFields, getWTForm, postForm } from "./externalCalls";
import { AddProduct, WTOrder, WoocommerceOrder, kvProduct } from "./interfaces";
import { generateToken } from "./utils";


export interface Env {
	PEDIDOS: any,
	PRODUCTS: any
}
const formFields = ["Menú", "Nombre completo", "Código Postal", "Calle y número (exterior e interior)", "Colonia", "Municipio", "Estado", "WhatsApp", "Correo", "Observaciones", "Costo de envío"];

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const wtForm = await getWTForm();
		const pToken = await getwToken(await wtForm);
		const code = 'b10fc38d1a59d9';
		const device = getToken(code);
		if (request.method === "POST") {
			const reqBody = await request.json() as WoocommerceOrder;
			await env.PEDIDOS.put(new Date().toISOString(), JSON.stringify(await request.json()));

			const fields = await fetchFields(code);
			let products = await env.PRODUCTS.list().map((product: kvProduct) => (mapProducts(product, env)));

			const productsInOrder = reqBody['line_items'].map((item) => {
				const matchingOrder = products.find((product: kvProduct) => product.wpId === item.id);
				if (matchingOrder === undefined) {
					throw new Error('Product not registered')
				}
				return matchingOrder;
			});

			await Promise.all([
				productsInOrder.map(async _product => {
					await addProduct(getAddProductPayload(_product, code, device, pToken), code)
				})
			]);

			postForm(formPayload(device, code, pToken), code)
			return new Response('ok');
		}
		return new Response('Hello World!');
	},
};


const mapProducts = async (product: any, env: Env) => {
	return await env.PRODUCTS.get(product.name);
}

const getToken = (formId: string) => {
	return formId + "-" + generateToken(25) + "-" + generateToken(25) + "-" + generateToken(15)
}

const getAddProductPayload = (product: kvProduct, code: string, device: string, pToken: string) => {
	return {
		cantAdd: 1,
		codeProd: product.wtfID,
		device,
		form: code,
		isjson: false,
		islogin: false,
		pToken,
		typeAdd: 'flash',
		ulogin: {
			"name": "",
			"email": "",
			"whatsapp": "",
			"userid": "",
			"username": "",
			"address": []
		}
	}
}

const formPayload = (device: string, code: string, wtoken: string) => {
	return {
		wautop: 'OFF',
		wtoken,
		method_pay: '',
		device,
		form: code,
		lform: false,
		uform: null
	} as WTOrder
};


async function getwToken(response: Response): Promise<string> {
	let wtokenValue = '';
	new HTMLRewriter().on('input#wtoken', {
	  element(element) {
		const value = element.getAttribute('value')
		if (value) {
		  wtokenValue = value; 
		  console.log('wtoken value:', wtokenValue)
		}
	  },
	}).transform(response)
  
	return wtokenValue
  }
  