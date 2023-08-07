import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import LoggedInUser from './loggedInUser';
import userEvent from '@testing-library/user-event';

describe('<LoggedInUser />', () => {
  test('LoggedInUser mounts properly', () => {
    const { container } = render(
      <LoggedInUser username={'testuser'} toggledUser={'testuser'} setToggledUser={() => {}} />,
    );
    expect(container).toBeTruthy();
  });

  test('Highlights toggled user', () => {
    const { container } = render(
      <LoggedInUser username={'testuser'} toggledUser={'testuser'} setToggledUser={() => {}} />,
    );
    expect(container.querySelector('.bg-gray-300')).toBeTruthy();
  });

  test('Does not highlight toggled user', () => {
    const { container } = render(
      <LoggedInUser username={'testuser'} toggledUser={'nottestuser'} setToggledUser={() => {}} />,
    );
    expect(container.querySelector(`.bg-gray-300`)).not.toBeTruthy();
  });

  test('get toggled on click', async () => {
    let variable = 'testuser';
    const { container } = render(
      <LoggedInUser
        username={'testuser'}
        toggledUser={variable}
        setToggledUser={() => {
          variable = 'nottestuser';
        }}
      />,
    );

    const toggleElement = container.querySelector(`.bg-gray-300`) as Element;
    await userEvent.click(toggleElement);
    const { container: newContainer } = render(
      <LoggedInUser
        username={'testuser'}
        toggledUser={variable}
        setToggledUser={() => {
          variable = 'nottestuser';
        }}
      />,
    );
    expect(newContainer.querySelector(`.bg-gray-300`)).not.toBeTruthy();
  });
});
