import { useRef, useState } from "react";
import { SelectOption } from "utils/interfaces";
import styles from "./select.module.scss";
import { useClickOutside } from "hooks";

interface Props {
  title: string;
  options: SelectOption[];
  setValue: (value: string) => void;
  value: string;
  multiSelect?: boolean;
}

const Select = ({ title = "", options = [], setValue, value }: Props) => {
  const ref = useRef<HTMLSelectElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSelect = () => setIsOpen(false);
  const handleOpenSelect = () => setIsOpen(true);
  const handleClickOutside = () => setIsOpen(false);

  useClickOutside(ref, handleClickOutside);

  return (
    <label
      htmlFor={title}
      className={`${styles.dropdown} ${isOpen ? styles.open : ""}`}
    >
      <select
        title={title}
        className={styles.dropdown__select}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onClick={isOpen ? handleCloseSelect : handleOpenSelect}
      >
        {options.map(({ name, iso }) => (
          <option key={name} value={iso} title={name}>
            <>
              {name} ({iso})
            </>
          </option>
        ))}
      </select>
    </label>
  );
};

export { Select };
