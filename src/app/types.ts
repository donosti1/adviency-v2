export interface Gift {
  id: number;
  title: string;
  ownerId: number;
  qty: number;
  imgSrc: string;
  unitPrice: number;
}
export interface Owners {
  value: number;
  label: string;
}
