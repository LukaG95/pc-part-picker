import { useContext, useState } from 'react';
import styles from './ChooseComponents.module.scss';
import PC_Component from './PC_Component.js';
import useWindowDimensions from '../misc/WindowDimensions.js';
import { SelectionContext  } from "../context/SelectionContext.js";
import MobilePcComponent from './MobilePcComponent.js';

function ChooseComponents({ selectedComponent, setSelectedComponent }) {
  const { userSelections } = useContext(SelectionContext);
  const { s_width } = useWindowDimensions();

  return (
    <div className={styles["main-wrapper"]}>
        <div className={styles.title}>IZBERI KOMPONENTE</div>
        <div className={styles.components}>
          {
            Object.keys(userSelections).map(i => {
              const component = userSelections[i];
              if (s_width > 1150)
              return (
                <PC_Component 
                  key={component.type}
                  component={component}
                  selectedComponent={selectedComponent}
                  setSelectedComponent={setSelectedComponent}
                />
              )
              else return (
                <MobilePcComponent 
                  key={component.type}
                  component={component}
                  selectedComponent={selectedComponent}
                  setSelectedComponent={setSelectedComponent}
                />
              )
            })
          }
        </div>
    </div>
  );
}

export default ChooseComponents;