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
    data: [],
    comment: null
};

/**
 * Controlled vocabulary for the type field of biom objects
 * @type {string[]}
 */
export const TYPE_CV = [
    'OTU table',
    'Pathway table',
    'Function table',
    'Ortholog table',
    'Gene table',
    'Metabolite table',
    'Taxon table'
];

/**
 * Controlled vocabulary for the matrix_type field of biom objects
 * @type {string[]}
 */
export const MATRIX_TYPE_CV = [
    'sparse', // only non-zero values are specified
    'dense'   // every element must be specified
];

/**
 * Controlled vocabulary for the matrix_element_type field of biom objects
 * @type {string[]}
 */
export const MATRIX_ELEMENT_TYPE_CV = [
    'int',    // integer
    'float',  // floating point
    'unicode' // unicode string
];

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
     * @param _comment
     */
    constructor({
        id: _id = null,
        format: _format = DEFAULT_BIOM.format,
        format_url: _format_url = DEFAULT_BIOM.format_url,
        type: _type = DEFAULT_BIOM.type,
        generated_by: _generated_by = DEFAULT_BIOM.generated_by,
        date: _date = null,
        rows: _rows = DEFAULT_BIOM.rows,
        columns: _columns = DEFAULT_BIOM.columns,
        matrix_type: _matrix_type = DEFAULT_BIOM.matrix_type,
        matrix_element_type:
            _matrix_element_type = DEFAULT_BIOM.matrix_element_type,
        shape: _shape = DEFAULT_BIOM.shape,
        data: _data = DEFAULT_BIOM.data,
        comment: _comment = DEFAULT_BIOM.comment
    } = {}){
        this.id = _id;
        this.format = _format;
        this.format_url = _format_url;
        this.type = _type;
        this.generated_by = _generated_by;
        if(_date === null){
            _date = new Date().toISOString();
        }
        this.date = _date;
        this.rows = _rows;
        this.columns = _columns;
        this.matrix_type = _matrix_type;
        this.matrix_element_type = _matrix_element_type;
        this.shape = _shape;
        this.data = _data;
        this.comment = _comment;
    }

    /**
     * Getter for id
     * @returns {string|null} - A field that can be used to id a table (or null)
     */
    get id(){
        return this._id;
    }

    /**
     * Setter for id
     * @param id {string|null} - A field that can be used to id a table (or null)
     * @throws {TypeError} if id is not a string (or null)
     */
    set id(id){
        if(id !== null && typeof id !== 'string'){
            throw new TypeError('id must be string or null');
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
     * Setter for format
     * @param format {string} - The name and version of the current biom format
     * @throws {TypeError} if format is not a string
     */
    set format(format){
        if(typeof format !== 'string'){
            throw new TypeError('format must be string');
        }
        this._format = format;
    }

    /**
     * Getter for format_url
     * @returns {string} - A string with a static URL providing format details
     */
    get format_url(){
        return this._format_url;
    }

    /**
     * Setter for format_url
     * @param format_url {string} - A string with a static URL
     *                              providing format details
     *                              (not checked whether the string is an url)
     * @throws {TypeError} if format_url is not a string
     */
    set format_url(format_url){
        if(typeof format_url !== 'string'){
            throw new TypeError('format_url must be string' +
                ' (representing a static URL)');
        }
        this._format_url = format_url;
    }

    /**
     * Getter for type
     * @returns {string} - Table type (a controlled vocabulary)
     *                     Acceptable values:
     *                       'OTU table'
     *                       'Pathway table'
     *                       'Function table'
     *                       'Ortholog table'
     *                       'Gene table'
     *                       'Metabolite table'
     *                       'Taxon table'
     */
    get type(){
        return this._type;
    }

    /**
     * Setter for type
     * @param type {string} - Table type (a controlled vocabulary)
     *                        Acceptable values:
     *                          'OTU table'
     *                          'Pathway table'
     *                          'Function table'
     *                          'Ortholog table'
     *                          'Gene table'
     *                          'Metabolite table'
     *                          'Taxon table'
     * @throws {TypeError} if type is not a string
     * @throws {Error} if type is not in the controlled vocabulary
     */
    set type(type){
        if(typeof type !== 'string'){
            throw new TypeError('type must be string' +
                ' (part of the controlled vocabulary)');
        }
        if(TYPE_CV.indexOf(type) === -1){
            throw new Error('type must be part of the controlled vocabulary');
        }
        this._type = type;
    }

    /**
     * Getter for generated_by
     * @returns {string} - Package and revision that built the table
     */
    get generated_by(){
        return this._generated_by;
    }

    /**
     * Setter for generated_by
     * @param generated_by {string} - Package and revision that built the table
     * @throws {TypeError} if generated_by is not a string
     */
    set generated_by(generated_by){
        if(typeof generated_by !== 'string'){
            throw new TypeError('generated_by must be string');
        }
        this._generated_by = generated_by;
    }

    /**
     * Getter for date
     * @returns {string} - Date the table was built (ISO 8601 format)
     */
    get date(){
        return this._date;
    }

    /**
     * Setter for date
     * @param date {string} - Date the table was built (ISO 8601 format)
     *                       (not checked whether the string is a date)
     * @throws {TypeError} if date is not a string
     */
    set date(date){
        if(typeof date !== 'string'){
            throw new TypeError('date must be string (ISO 8601 format)');
        }
        this._date = date;
    }

    /**
     * Getter for rows
     * @returns {Array} - An ORDERED list of obj describing the rows
     */
    get rows(){
        return this._rows;
    }

    /**
     * Setter for rows
     * @param rows {Array} - An ORDERED list of obj describing the rows
     * @throws {TypeError} if date is not an Array
     */
    set rows(rows){
        if(Object.prototype.toString.call(rows) !== '[object Array]'){
            throw new TypeError('rows must be an Array');
        }
        this._rows = rows;
    }

    /**
     * Getter for columns
     * @returns {Array} - An ORDERED list of obj describing the columns
     */
    get columns() {
        return this._columns;
    }

    /**
     * Setter for columns
     * @param columns {Array} - An ORDERED list of obj describing the columns
     * @throws {TypeError} if date is not an Array
     */
    set columns(columns){
        if(Object.prototype.toString.call(columns) !== '[object Array]'){
            throw new TypeError('columns must be an Array');
        }
        this._columns = columns;
    }

    /**
     * Getter for matrix_type
     * @returns {string} - Type of matrix data representation
     *                     (a controlled vocabulary) Acceptable values:
     *                       'sparse' : only non-zero values are specified
     *                       'dense' : every element must be specified
     */
    get matrix_type(){
        return this._matrix_type;
    }

    /**
     * Setter for matrix_type
     * @param matrix_type {string} - Type of matrix data representation
     *                               (a controlled vocabulary)
     *                               Acceptable values:
     *                             'sparse' : only non-zero values are specified
     *                             'dense' : every element must be specified
     * @throws {TypeError} if matrix_type is not a string
     * @throws {Error} if matrix_type is not in the controlled vocabulary
     */
    set matrix_type(matrix_type){
        if(typeof matrix_type !== 'string'){
            throw new TypeError('matrix_type must be string' +
                ' (part of the controlled vocabulary: "dense" or "sparse")');
        }
        if(MATRIX_TYPE_CV.indexOf(matrix_type) === -1){
            throw new Error('matrix_type must be part of the' +
                ' controlled vocabulary: "dense" or "sparse"');
        }
        this._matrix_type = matrix_type;
    }

    /**
     * Getter for matrix_element_type
     * @returns {string} - Value type in matrix (a controlled vocabulary)
     *                     Acceptable values:
     *                       'int' : integer
     *                       'float' : floating point
     *                       'unicode' : unicode string
     */
    get matrix_element_type(){
        return this._matrix_element_type;
    }

    /**
     * Setter for matrix_element_type
     * @param matrix_element_type {string} - Value type in matrix
     *                               (a controlled vocabulary)
     *                               Acceptable values:
     *                                 'int' : integer
     *                                 'float' : floating point
     *                                 'unicode' : unicode string
     * @throws {TypeError} if matrix_element_type is not a string
     * @throws {Error} if matrix_element_type is not in controlled vocabulary
     */
    set matrix_element_type(matrix_element_type){
        if(typeof matrix_element_type !== 'string'){
            throw new TypeError('matrix_element_type must be string' +
                ' (part of the controlled vocabulary:' +
                ' "int", "float" or "unicode")');
        }
        if(MATRIX_ELEMENT_TYPE_CV.indexOf(matrix_element_type) === -1){
            throw new Error('matrix_element_type must be part of the' +
                ' controlled vocabulary: "int", "float" or "unicode"');
        }
        this._matrix_element_type = matrix_element_type;
    }

    /**
     * Getter for shape
     * @returns {Array} - the number of rows and number of columns in data
     */
    get shape(){
        return this._shape;
    }

    /**
     * Setter for shape
     * @param shape {Array} - the number of rows and number of columns in data
     * @throws {TypeError} if shape is not an Array
     * @throws {Error} if shape contains something other than
     *                 two non-negative integers
     */
    set shape(shape){
        if(Object.prototype.toString.call(shape) !== '[object Array]'){
            throw new TypeError('shape must be an Array containing' +
                ' exactly two non-negative integers');
        }
        if(shape.length !== 2){
            throw new Error('shape does not contain exactly two elements');
        }
        if(!Number.isInteger(shape[0]) ||
            shape[0] < 0 || !Number.isInteger(shape[1]) || shape[1] < 0){
            throw new Error('shape does not contain non-negative integers');
        }
        this._shape = shape;
    }

    /**
     * Getter for data
     * @returns {Array} - counts of observations by sample
     *                   if matrix_type is 'sparse', [[row, column, value],
     *                                                 [row, column, value],
     *                                                                  ...]
     *                   if matrix_type is 'dense', [[value, value, value, ...],
     *                                               [value, value, value, ...],
     *                                                                      ...]
     */
    get data(){
        return this._data;
    }

    /**
     * Setter for data
     * @param data {Array} - counts of observations by sample
     *                   if matrix_type is 'sparse', [[row, column, value],
     *                                                 [row, column, value],
     *                                                                  ...]
     *                   if matrix_type is 'dense', [[value, value, value, ...],
     *                                               [value, value, value, ...],
     *                                                                      ...]
     * @throws {TypeError} if date is not an Array
     */
    set data(data){
        if(Object.prototype.toString.call(data) !== '[object Array]'){
            throw new TypeError('data must be an Array');
        }
        this._data = data;
    }

    /**
     * Getter for comment
     * @returns {string|null} - A free text field containing any information that you
     *                     feel is relevant (or just feel like sharing)
     */
    get comment(){
        return this._comment;
    }

    /**
     * Setter for comment
     * @param comment {string|null} - A free text field containing any information that
     *                           you feel is relevant (or just feel like sharing)
     * @throws {TypeError} if comment is not a string (or null)
     */
    set comment(comment){
        if(comment !== null && typeof comment !== 'string'){
            throw new TypeError('comment must be string or null');
        }
        this._comment = comment;
    }
}
