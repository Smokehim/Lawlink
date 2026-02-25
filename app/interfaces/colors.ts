export interface ColorScheme {
  bgGradient?: string;
  textPrimary?: string;
  btnPrimary?: string;
  btnPrimaryHover?: string;
}

// this mirrors the palette used on the home page (no orange at all)
export const homeColors: ColorScheme = {
  bgGradient: "bg-gradient-to-br from-blue-50 to-indigo-100",
  textPrimary: "text-gray-900",
  btnPrimary: "bg-blue-600 text-white",
  btnPrimaryHover: "hover:bg-blue-700",
};
