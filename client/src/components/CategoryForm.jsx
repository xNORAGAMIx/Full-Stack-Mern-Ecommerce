/* eslint-disable react/prop-types */
const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="flex flex-col justify-center space-y-5 max-w-md mx-auto p-4">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Manage Categories</h2>
        <p className="text-md md:text-xl">Enter category to add.</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-md space-y-5"
      >
        <input
          type="text"
          className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal focus:outline-none"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-center space-x-16">
          <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-red-600 bg-red-600 text-white"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
