import { parse } from 'csv-parse/sync'

export function parseCsv(data: string) {
  return parse(data, { columns: true, skip_empty_lines: true })
}
