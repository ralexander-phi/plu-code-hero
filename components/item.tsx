function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export default function Item({
  category,
  sub_category,
  variety,
  size,
}: {
  category : string,
  sub_category : string,
  variety: string,
  size: string,
}) {
  const title = (<>
      <p>{ toTitleCase(category) }</p>
      <p>{ toTitleCase(sub_category) }</p>
    </>);
  const name = (<h3 className="subtitle is-3 m-3">{ toTitleCase(variety) }</h3>);
  var sizeDiv = (<></>);
  if (size != 'all sizes') {
    sizeDiv =( <p>{ toTitleCase(size) }</p>);
  }
  return (<>
    { title }
    { name }
    { sizeDiv }
    </>);
}
