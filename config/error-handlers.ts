import { QueryResult } from 'pg';

export function handleUpdateJobCountError (result: QueryResult) {
    if (result.rowCount !== 1) console.warn(`Expected to update 1 row, but updated ${result.rowCount}`);
      
}

export function checkQueryResult (result: QueryResult) {
    
    if (result.rows.length === 0) {
        return false;
    }   
    else {
        return true;
    }
}

export function errorString (failedFunction: string):string {

    return `program failed in function ${failedFunction}`;
}