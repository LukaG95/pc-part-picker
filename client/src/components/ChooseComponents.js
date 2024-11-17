import { useContext, useState } from 'react';
import styles from './ChooseComponents.module.scss';
import PC_Component from './PC_Component.js';
import { SelectionContext  } from "../context/SelectionContext.js";

function ChooseComponents(props) {
  const { userSelections } = useContext(SelectionContext);
  const [open, setOpen] = useState();

  //console.log(userSelections)

  return (
    <div className={styles["main-wrapper"]}>
      <div className={styles.title}>IZBERI KOMPONENTE</div>

      <div className={styles.components}>
        {
          Object.keys(userSelections).map(i => {
            const component = userSelections[i];
            return (
              <PC_Component 
                key={component.type}
                type={component.type}
                name={component.name}
                product={component.product}
                setOpen={setOpen}
              />
            )
          })
        }
      </div>
      
    </div>
  );
}

export default ChooseComponents;