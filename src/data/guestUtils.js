export async function fetchGuests() {
  const SHEET_ID = "1H9Bqj96F1zLGrkWniv6Nt06lqxTf-741yoPgraFsyXU"
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`

  const res = await fetch(url)
  const text = await res.text()
  const json = JSON.parse(text.substring(47).slice(0, -2))

  return json.table.rows
    .map(row => ({
      nome: row.c[0]?.v || "",
      stile: row.c[1]?.v || "",
      instagram: row.c[2]?.v || "",
      foto: row.c[3]?.v || "",
      date: row.c[4]?.v || "",
      attivo: row.c[5]?.v === "SI"
    }))
    .filter(g => g.attivo && g.nome)
}
