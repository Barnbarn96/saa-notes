
export default function CoreConcept({ title, image, description, onSelect }) {

  return (
    <li onClick={() => onSelect} >
      <img src={image} alt={title}/>
      <h3 >{title}</h3>
      <p>{description}</p>
    </li>
  )
}