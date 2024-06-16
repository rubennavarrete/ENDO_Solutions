export default function GetFiltersQuery(filters: any) {
  let newFilter = '?';
  if (filters.pagination) {
    newFilter += `pagination=${JSON.stringify(filters.pagination)}`;
  } else {
    newFilter += `pagination={"page":1,"limit":10}`;
  }
  if (filters.filter) {
    if (filters.filter.status?.parameter === 'str_parroquia_nombre') {
      newFilter = `?pagination={"page":1,"limit":50}`;
    }
    newFilter += `&filter=${JSON.stringify(filters.filter)}`;
  }
  if (filters.sort) {
    newFilter += `&sort=${JSON.stringify(filters.sort)}`;
  }
  if (filters.type) {
    newFilter += `&type=${filters.type}`;
  }
  if (filters.order) {
    newFilter += `&order=${JSON.stringify(filters.order)}`;
  }
  if (filters.tipo) {
    newFilter += `&tipo=${JSON.stringify(filters.tipo)}`;
  }

  return newFilter;
}
