import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { bemClass } from '../helpers/bem';

import './Sortable.scss';

function moveByIndex(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function Sortable({ className, children, items, itemIdKey, onChange }) {
  return (
    <DragDropContext
      onDragEnd={result => {
        // dropped outside the list
        if (!result.destination) return;

        const newItems = moveByIndex(items, result.source.index, result.destination.index);

        onChange(newItems);
      }}
    >
      <Droppable droppableId="droppable">
        {(providedDroppable, droppableSnapshot) => (
          <ul
            ref={providedDroppable.innerRef}
            className={bemClass(
              'Sortable',
              {
                dragging: droppableSnapshot.isDraggingOver,
              },
              className
            )}
          >
            {items.map((item, index) => (
              <Draggable key={item[itemIdKey]} draggableId={item[itemIdKey]} index={index}>
                {(providedDraggable, draggableSnapshot) => (
                  <li
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    className={bemClass('Sortable__item', {
                      dragging: draggableSnapshot.isDragging,
                    })}
                  >
                    {children(
                      item,
                      {
                        ...providedDraggable.dragHandleProps,
                        className: bemClass('Sortable__handle', {
                          dragging: draggableSnapshot.isDragging,
                        }),
                      },
                      draggableSnapshot.isDragging,
                      index
                    )}
                  </li>
                )}
              </Draggable>
            ))}
            {providedDroppable.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

Sortable.displayName = 'Sortable';

Sortable.defaultProps = {
  itemIdKey: 'id',
};

Sortable.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func.isRequired,
  itemIdKey: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default Sortable;
