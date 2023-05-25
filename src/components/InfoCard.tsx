import { classNames } from "../utilities/helpers";

export type Info = {
  title: string;
  value: number;
};
interface Props {
  infos: Info[];
  isOrange: boolean;
}
const InfoCards: React.FC<Props> = ({ infos, isOrange }) => {
  const cards = (title: string, value: number) => {
    return (
      <div
        key={title}
        className={classNames(
          "px-3 py-2 rounded-md  justify-start flex-row",
          isOrange
            ? "bg-orange-50"
            : "bg-white border border-gray-500 border-dashed"
        )}>
        <span className='block text-sm text-gray-800 font-bold text-center'>
          {title}
        </span>
        <span
          className={classNames(
            `block text-base font-semibold mt-2 text-center`,
            isOrange ? "text-red-500" : "text-gray-700"
          )}>
          {value.toFixed(2)}
        </span>
      </div>
    );
  };
  return (
    <div className='w-full'>
      <div className='grid  md:grid-cols-3 grid-rows-none gap-3 max-sm:grid-rows-3 grid-cols-none gap-y-3'>
        {infos.map((data) => {
          return cards(data.title, data.value);
        })}
      </div>
    </div>
  );
};

export default InfoCards;
