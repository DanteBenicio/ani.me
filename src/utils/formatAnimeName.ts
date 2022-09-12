export default function formatAnimeName(text: string) {
  return text.replace(/(\/anime\/)/gi, '').replace(/%20/g, ' ').replace(/%C3%97/gi, '×').replace(/%E2%98%86/gi, '☆')
}