import InfoCards from "./components/InfoCard";
import RadioGroupComponent, { Option } from "./components/RadioGroup";
import useEMICalculator from "./hoooks/useEMICalculator";

const App = () => {
  const {
    setPrincipal,
    setInterestRate,
    setTenure,
    emi,
    isMonthly,
    setMonthly,
    calculateEMI,
    results,
  } = useEMICalculator();

  const radioOptions: Option[] = [
    {
      name: "Monthly",
      value: "m",
    },
    {
      name: "Yearly",
      value: "y",
    },
  ];
  const handleOptionChange = (value: string) => {
    if (value === "m") {
      setMonthly(true);
    } else {
      setMonthly(false);
    }
  };

  const handleSubmit = () => {
    calculateEMI();
  };
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-white rounded-lg shadow-lg p-6  border border-zinc-100 md:w-2/4 sm:w-11/12'>
          <h2 className='text-2xl text-center mb-4'>Emi Calculator</h2>
          <div className='mb-4'>
            <label className='block mb-2 text-gray-700'>Primary Amount</label>
            <input
              className='border border-gray-300 px-4 py-2 rounded-md w-full'
              type='text'
              defaultValue={0}
              onChange={(e) =>
                setPrincipal(
                  isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                )
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 text-gray-700'>
              Interest rate (%)
            </label>
            <input
              className='border border-gray-300 px-4 py-2 rounded-md w-full'
              type='text'
              defaultValue={0}
              onChange={(e) =>
                setInterestRate(
                  isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                )
              }
            />
          </div>
          <div className='mb-4 items-center justify-center sm:flex-row md:flex'>
            <div className='w-full'>
              <label className='block mb-2 text-gray-700'>
                Tenure (in {isMonthly ? "months" : "years"}):
              </label>
              <input
                className='border border-gray-300 px-4 py-2 rounded-md w-full'
                max={12}
                defaultValue={0}
                type='text'
                onChange={(e) =>
                  setTenure(
                    isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                  )
                }
              />
            </div>
            <div className='w-full md:ml-2'>
              <RadioGroupComponent
                onChange={handleOptionChange}
                options={radioOptions}
                label='Select One'
                selectedValue={isMonthly ? "m" : "y"}
              />
            </div>
          </div>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md'
            onClick={() => handleSubmit()}>
            Calculate
          </button>
          <br />
          <div className='hidden bg-white rounded-lg shadow-lg p-6 w-full mt-5 border border-separate border-stone-700'>
            <div className='flex items-center justify-center'>
              <span className='text-md font-bold text-gray-800'>
                Result: {emi.toFixed(3)}
              </span>
            </div>
          </div>
          <div className='mt-4'>
            <InfoCards infos={results} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
