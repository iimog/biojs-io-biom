/*
 * biojs-io-biom
 * https://github.com/iimog/biojs-io-biom
 *
 * Copyright (c) 2016 Markus J. Ankenbrand
 * Licensed under the MIT license.
 */

/**
 * Version
 * @type {string} version of this module
 */
export const VERSION = '0.1.0';

/**
 * Default Biom Object for empty initialization
 * @type {{
 * id: null,
 * format: string,
 * format_url: string,
 * type: string,
 * generated_by: string,
 * date: Date,
 * rows: Array,
 * columns: Array,
 * matrix_type: string,
 * matrix_element_type: string,
 * shape: number[],
 * data: Array
 * }}
 */
export const DEFAULT_BIOM = {
    id: null,
    format: 'Biological Observation Matrix 1.0.0',
    format_url: 'http://biom-format.org',
    type: 'OTU table',
    generated_by: `biojs-io-biom v${VERSION}`,
    date: null, // will be set to Date.now() in the constructor
    rows: [],
    columns: [],
    matrix_type: 'sparse',
    matrix_element_type: 'float',
    shape: [0,0],
    data: []
};

/**
 * @class Biom
 */
export class Biom {
    /**
     * constructor
     * @param _id
     * @param _format
     * @param _format_url
     * @param _type
     * @param _generated_by
     * @param _date
     * @param _rows
     * @param _columns
     * @param _matrix_type
     * @param _matrix_element_type
     * @param _shape
     * @param _data
     */
    constructor({
        id: _id = null,
        format: _format = DEFAULT_BIOM.format,
        format_url: _format_url = DEFAULT_BIOM.format_url,
        type: _type = DEFAULT_BIOM.type,
        generated_by: _generated_by = DEFAULT_BIOM.generated_by,
        date: _date = Date.now(),
        rows: _rows = DEFAULT_BIOM.rows,
        columns: _columns = DEFAULT_BIOM.columns,
        matrix_type: _matrix_type = DEFAULT_BIOM.matrix_type,
        matrix_element_type:
            _matrix_element_type = DEFAULT_BIOM.matrix_element_type,
        shape: _shape = DEFAULT_BIOM.shape,
        data: _data = DEFAULT_BIOM.data
    } = {}){
        this._id = _id;
        this._format = _format;
        this._format_url = _format_url;
        this._type = _type;
        this._generated_by = _generated_by;
        this._date = _date;
        this._rows = _rows;
        this._columns = _columns;
        this._matrix_type = _matrix_type;
        this._matrix_element_type = _matrix_element_type;
        this._shape = _shape;
        this._data = _data;
    }

    /**
     * Getter for id
     * @returns {string} - A field that can be used to id a table (or null)
     */
    get id(){
        return this._id;
    }

    /**
     * Setter for id
     * @param id {string} - Update id to string or null
     */
    set id(id){
        if(id !== null && typeof id !== "string"){
            throw new TypeError("id must be string or null");
        }
        this._id = id;
    }

    /**
     * Getter for format
     * @returns {string} - The name and version of the current biom format
     */
    get format(){
        return this._format;
    }

    /**
     * Getter for format_url
     * @returns {string} - A string with a static URL providing format details
     */
    get format_url(){
        return this._format_url;
    }

    /**
     * Getter for type
     * @returns {string} - Table type (a controlled vocabulary)
     *                     Acceptable values:
     *                       "OTU table"
     *                       "Pathway table"
     *                       "Function table"
     *                       "Ortholog table"
     *                       "Gene table"
     *                       "Metabolite table"
     *                       "Taxon table"
     */
    get type(){
        return this._type;
    }

    /**
     * Getter for generated_by
     * @returns {string} - Package and revision that built the table
     */
    get generated_by(){
        return this._generated_by;
    }

    /**
     * Getter for date
     * @returns {Date} - Date the table was built (ISO 8601 format)
     */
    get date(){
        return this._date;
    }

    /**
     * Getter for rows
     * @returns {Array} - An ORDERED list of obj describing the rows
     */
    get rows(){
        return this._rows;
    }

    /**
     * Getter for columns
     * @returns {Array} - An ORDERED list of obj describing the columns
     */
    get columns(){
        return this._columns;
    }

    /**
     * Getter for matrix_type
     * @returns {string} - Type of matrix data representation
     *                     (a controlled vocabulary) Acceptable values:
     *                       "sparse" : only non-zero values are specified
     *                       "dense" : every element must be specified
     */
    get matrix_type(){
        return this._matrix_type;
    }

    /**
     * Getter for matrix_element_type
     * @returns {string} - Value type in matrix (a controlled vocabulary)
     *                     Acceptable values:
     *                       "int" : integer
     *                       "float" : floating point
     *                       "unicode" : unicode string
     */
    get matrix_element_type(){
        return this._matrix_element_type;
    }

    /**
     * Getter for shape
     * @returns {Array} - the number of rows and number of columns in data
     */
    get shape(){
        return this._shape;
    }

    /**
     * Getter for data
     * @returns {Array} - counts of observations by sample
     *                   if matrix_type is "sparse", [[row, column, value],
     *                                                 [row, column, value],
     *                                                                  ...]
     *                   if matrix_type is "dense", [[value, value, value, ...],
     *                                               [value, value, value, ...],
     *                                                                      ...]
     */
    get data(){
        return this._data;
    }
}
