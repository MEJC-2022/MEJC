export interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  summary: string[];
  price: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export const products: Product[] = [
  {
    id: '1',
    image:
      'https://cdn.pixabay.com/photo/2016/11/19/15/32/laptop-1839876_960_720.jpg',
    name: 'UltraBook X9',
    description:
      'The UltraBook X9 is the ultimate productivity machine for professionals on-the-go. With its lightweight design and powerful hardware, you can breeze through any task without breaking a sweat. The X9 also features a stunning 15-inch display with 4K resolution, perfect for streaming your favorite shows or editing photos.',
    summary: ['Lightweight design', 'Powerful hardware', '15-inch 4K display'],
    price: 1599,
    stock: 11,
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    name: 'PowerBook 13',
    description:
      'The PowerBook 13 is the perfect laptop for students and creative professionals. With its compact size and powerful performance, you can take your work wherever you go. The 13-inch Retina display delivers crisp and clear visuals, while the powerful processor ensures speedy performance.',
    summary: [
      'Perfect for studying',
      '13-inch Retina display',
      'Powerful processor',
    ],
    price: 3919,
    stock: 5,
  },
  {
    id: '3',
    image:
      'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600',
    name: 'GamingBook Pro',
    description:
      'The GamingBook Pro is the ultimate gaming machine for hardcore gamers. With its powerful graphics card and lightning-fast processor, you can play the latest games at the highest settings. The 17-inch Full HD display delivers immersive visuals, while the backlit keyboard ensures you can keep gaming even in low light.',
    summary: [
      'Ideal for gaming',
      '17-inch Full HD display',
      'Backlit keyboard',
    ],
    price: 2299,
    stock: 20,
  },
  {
    id: '4',
    image:
      'https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'BookAir S',
    description:
      'The BookAir S is the perfect laptop for those who value style and portability. With its slim and lightweight design, you can take it with you wherever you go. The 14-inch Full HD display delivers stunning visuals, while the long-lasting battery ensures you can work or play all day.',
    summary: [
      'Slim and lightweight design',
      '14-inch Full HD display',
      'Long-lasting battery',
    ],
    price: 1299,
    stock: 32,
  },
  {
    id: '5',
    image:
      'https://images.pexels.com/photos/669228/pexels-photo-669228.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'WorkBook Plus',
    description:
      'The WorkBook Plus is the ultimate workstation for professionals who need to run demanding applications. With its powerful hardware and spacious 17-inch display, you can work on multiple projects at once without any lag. The workstation also features a backlit keyboard for typing in low light conditions.',
    summary: [
      'Multiple projects at once',
      'Spacious 17-inch display',
      'Backlit keyboard',
    ],
    price: 999,
    stock: 1,
  },
  {
    id: '6',
    image:
      'https://images.unsplash.com/flagged/1/apple-gear-looking-pretty.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    name: 'TravelBook Mini',
    description:
      'The TravelBook Mini is the perfect laptop for those who are always on-the-go. With its compact size and long-lasting battery, you can take it with you wherever you go. The 11-inch display delivers crisp visuals, while the lightweight design ensures you can carry it with ease.',
    summary: ['Long-lasting battery', '11-inch display', 'Lightweight design'],
    price: 5499,
    stock: 42,
  },
];
