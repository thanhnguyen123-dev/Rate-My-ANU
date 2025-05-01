
interface DescriptionCardProps {
  courseCode: string;
  name: string;
  units: number;
  modeOfDelivery: string;
  year: number;
  prerequisites: string[];
  description: string[];
}

const InformationCard = ({ 
  courseCode, 
  name, 
  units, 
  modeOfDelivery, 
  year, 
  prerequisites, 
  description 
}: DescriptionCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1>{name}</h1>
      <p>{units} units</p>
      <p>{modeOfDelivery}</p>
      <p>{year}</p>
      {prerequisites.map((prerequisite) => (
        <p key={prerequisite}>{prerequisite}</p>
      ))}
      {description.map((desc) => (
        <p key={desc}>{desc}</p>
      ))}
    </div>
  );
};

export default InformationCard;