export type Info = {
  title: string;
  value: number;
};
interface Props {
  infos: Info[];
}
const InfoCards: React.FC<Props> = ({ infos }) => {
  const cards = (title: string, value: number) => {
    return (
      <div
        key={title}
        className='px-3 py-2 rounded-md border border-gray-100 shadow-md justify-start flex-row bg-zinc-100'>
        <span className='block text-sm text-zinc-500 font-bold text-center'>
          {title}
        </span>
        <span className='block text-base text-zinc-600 font-semibold mt-2 text-center'>
          {value.toFixed(2)}
        </span>
      </div>
    );
  };
  return (
    <div className='w-full'>
      <div className='grid  md:grid-cols-3 gap-3 sm:grid-rows-3 gap-y-3'>
        {infos.map((data) => {
          return cards(data.title, data.value);
        })}
      </div>
    </div>
  );
};

export default InfoCards;
