export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'BalanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
