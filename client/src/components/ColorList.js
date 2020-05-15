import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: '',
    code: {
      hex: '',
    },
  });

  const history = useHistory();

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // make a put request to update a color
    console.log('colorToEdit: ', colorToEdit);
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit}`, colorToEdit)
      .then((res) => {
        console.log('res inside put', res);
        console.log('res.data', res.data);
        axiosWithAuth()
          .get('/api/colors')
          .then((res) => {
            updateColors(res.data);
          })
          .catch((err) => console.log('inner color edit error: ', err));
        console.log(res.data.payload);
        history.push('/protected');
      })
      .catch((err) => {
        console.log('outer color edit error: ', err);
      });
  };

  const deleteColor = (color) => {
    // make a delete request to delete a color
    console.log('colorToEdit', colorToEdit);
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`, color)
      .then((res) => {
        console.log('res inside put', res);
        console.log('res.data', res.data);
        axiosWithAuth()
          .get('/api/colors')
          .then((res) => {
            updateColors(res.data);
          })
          .catch((err) => console.log('inner color edit error: ', err));
        console.log(res.data.payload);
        history.push('/protected');
      })
      .catch((err) => {
        console.log('outer color edit error: ', err);
      });
  };

  const addColor = (e) => {
    // make a post request to add a color
    e.preventDefault();
    console.log(newColor);

    axiosWithAuth()
      .post('/api/colors', newColor)
      .then((res) => {
        axiosWithAuth()
          .get('/api/colors')
          .then((res) => {
            updateColors(res.data);
          })
          .catch((err) => {
            console.log();
            console.log(res.data.payload);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  const handleChange = (e) => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value });
  };

  const handleHexChange = (e) => {
    setNewColor({ ...newColor, code: { hex: e.target.value } });
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <div className='spacer' />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <p>Enter New Color Name:</p>
        <input
          style={{ margin: '10px auto' }}
          type='text'
          name='color'
          onChange={handleChange}
        />
        <p>Enter New Color Hex Code:</p>
        <input
          style={{ margin: '10px auto' }}
          type='text'
          name='hex'
          onChange={handleHexChange}
        />
        <button style={{ margin: '10px auto' }}>Add New Color</button>
      </form>
    </div>
  );
};

export default ColorList;
