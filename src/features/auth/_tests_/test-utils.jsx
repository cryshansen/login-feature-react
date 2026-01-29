import React from 'react';
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { TestProviders } from "./TestProviders"; //includes AuthProvider 

export function renderWithAuth(ui, { route = "/" } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <TestProviders>{ui}</TestProviders>
    </MemoryRouter>
  );
}
