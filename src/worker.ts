import { addProduct, fetchFields, getWTForm, postForm } from "./externalCalls";
import { AddProduct, FormField, WTOrder, WoocommerceOrder, kvProduct } from "./interfaces";
import { generateToken } from "./utils";


export interface Env {
	PEDIDOS: any,
	PRODUCTS: any
}
interface elems {
	title: string, 
	jsonField: string, 
	section: string
};

const formFields: elems[] = [
	{title: "Nombre completo", jsonField: '', section : 'shippment'},
	{title: "Código Postal", jsonField: '', section : 'shippment'},
	{title: "Calle y número (exterior e interior)", jsonField: '', section : 'shippment'},
	{title: "Colonia", jsonField: '', section : 'shippment'},
	{title: "Municipio", jsonField: '', section : 'shippment'},
	{title: "Estado", jsonField: '', section : 'shippment'},
	{title: "WhatsApp", jsonField: '', section : 'shippment'},
	{title: "Correo", jsonField: '', section : 'shippment'},
	{title: "Observaciones", jsonField: '', section : 'shippment'},
	{title: "Costo de envío", jsonField: '', section : 'shippment'}
];

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const wtForm = await getWTForm();
		const pToken = await getwToken(await wtForm) || '';
		const code = 'b10fc38d1a59d9';
		const device = getToken(code);
		if (request.method === "POST") {
			const reqBody = await request.json() as WoocommerceOrder;
			await env.PEDIDOS.put(new Date().toISOString(), JSON.stringify(await request.json()));

			const wtFieldsResponse = await fetchFields(code);
			const fields = wtFieldsResponse.data.response.inputs.reduce((prev: Record<string, { val: any }>, val: FormField) => mapFormFields(prev, val, formFields, reqBody), {})

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


async function getwToken(response: Response){
	let val;
	const rewriter = new HTMLRewriter()
	.on("input#wtoken", {
	  element(el) { 
		val =  el.getAttribute('value')
	  }
  
	});
	await rewriter.transform(response).text();
	return val
  }
  
const mapFormFields = (obj: Record<string, { val: string }>, wfield: FormField, formFields: elems[], reqBody: WoocommerceOrder)  => {
	const bodyField = formFields.find(_field => _field.title === wfield.title)
	obj[wfield.code_input] ={val: reqBody[bodyField?.section][bodyField.jsonField] };
	return obj;
}