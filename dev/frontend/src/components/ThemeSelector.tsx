import { useState, useEffect } from 'react';

const ThemeSelector = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'theme-emerald');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Change theme dynamically
  const changeTheme = (newTheme:string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save selected theme in localStorage
    setIsOpen(false);
  };

  useEffect(() => {
    document.documentElement.classList.remove('theme-emerald', 'theme-autumn', 'theme-orange', 'theme-blue', 'theme-green');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="relative p-4">

      <button className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none" onClick={()=> setIsOpen(!isOpen)}>
        Select Theme
      </button>

      {isOpen && (
      <div className="flex absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
        <ul className='space-y-2 p-2'>
          <li>
            <button
              className="p-2 bg-theme-emerald text-white rounded"
              onClick={() => changeTheme('theme-emerald')}
            />
          </li>
          <li>
            <button
              className="p-2 bg-theme-autumn text-white rounded"
              onClick={() => changeTheme('theme-autumn')}
            />
          </li>
          <li>
              <button
                className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
                onClick={() => changeTheme('theme-orange')}
              />
            </li>
          <li>
            <button
              className="p-2 bg-theme-blue text-white rounded"
              onClick={() => changeTheme('theme-blue')}
            />
          </li>
          <li>
              <button
                className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
                onClick={() => changeTheme('theme-green')}
              />
            </li>
        </ul>
      </div>
      )}
    </div>
  );
};

export default ThemeSelector;
