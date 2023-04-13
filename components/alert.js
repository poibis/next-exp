import { clsx } from 'clsx';
import styles from '../styles/alert.module.css';

export default function Alert( {children, type} ) {

  return (
    <div
      className= {clsx({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
    >
      {type ? (
        <>
          type exist  [{type}]<br/>
        </>
      ) : (
        <>
          type none<br/>
        </>
      )}

      It's alert's test box<br/>
      below is home's contents<br/><br/>

      {children} 
      
    </div>
  );
}
