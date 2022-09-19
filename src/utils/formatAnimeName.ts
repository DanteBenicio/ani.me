export default function formatAnimeName(text: string) {
  return text.replace(/(\/anime\/)/gi, '')
}