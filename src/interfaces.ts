export interface WoocommerceOrder {
  id: number;
  parent_id: number;
  status: string;
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
  };
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed: string | null;
  date_paid: string | null;
  cart_hash: string;
  number: string;
  meta_data: {
    id: number;
    key: string;
    value: string;
  }[];
  line_items: {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    taxes: any[];
    meta_data: {
      id: number;
      key: string;
      value: string;
      display_key: string;
      display_value: string;
    }[];
    sku: string;
    price: number;
    image: {
      id: string;
      src: string;
    };
    parent_name: string | null;
  }[];
  tax_lines: any[];
  shipping_lines: {
    id: number;
    method_title: string;
    method_id: string;
    instance_id: string;
    total: string;
    total_tax: string;
    taxes: any[];
    meta_data: {
      id: number;
      key: string;
      value: any;
      display_key: string;
      display_value: any;
    }[];
  }[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: string;
  date_modified_gmt: string;
  date_completed_gmt: string | null;
  date_paid_gmt: string | null;
  currency_symbol: string;
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
  };
}

export interface FormResponse {
  response: {
    form: {
      code_form: string;
      title: string;
      description: string | null;
      reference: string | null;
      version: string;
      is_active: number;
      counter: number;
      is_whatsapp: number;
      whatsapp_number: string | null;
      visits: number;
      sends: number;
      updated_at: string;
      created_at: string;
    };
    inputs: {
      code_input: string;
      type: string;
      title: string;
      description: string | null;
      tag: string | null;
      required: number;
      unique: number;
      visible: number;
      updated_at: string;
      created_at: string;
    }[];
  };
}

export interface kvProduct {
  name: string;
  wtfID: string;
  wpId: number;
}

export interface AddProduct {
  device: string;
  form: string;
  codeProd: string;
  cantAdd: number;
  typeAdd: string;
  islogin: boolean;
  isjson: boolean;
  ulogin: {
    name: string;
    email: string;
    whatsapp: string;
    userid: string;
    username: string;
    address: string[];
  };
  pToken: string;
}


export interface WTOrder {
  wautop: string;
  method_pay: string;
  device: string;
  form: string;
  lform: boolean;
  uform: string | null;
}

export interface FormField {
  code_input: string;
  type: string;
  title: string;
  description: string | null;
  tag: string | null;
  required: number;
  unique: number;
  visible: number;
  updated_at: string;
  created_at: string;
}