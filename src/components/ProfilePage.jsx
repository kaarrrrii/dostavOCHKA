import { useState } from 'react';
import { DELIVERY_ADDRESSES, ORDERS_HISTORY, PROFILE_DATA, PROFILE_TABS } from '../data/profile';

function normalizePhoneDigits(value) {
  const rawDigits = value.replace(/\D/g, '');
  if (rawDigits.startsWith('7') || rawDigits.startsWith('8')) {
    return rawDigits.slice(1, 11);
  }
  return rawDigits.slice(0, 10);
}

function formatPhoneFromDigits(digits) {
  let formatted = '+7 ';

  if (digits.length > 0) {
    formatted += `(${digits.slice(0, 3)}`;
  }
  if (digits.length >= 3) {
    formatted += ')';
  }
  if (digits.length > 3) {
    formatted += ` ${digits.slice(3, 6)}`;
  }
  if (digits.length > 6) {
    formatted += `-${digits.slice(6, 8)}`;
  }
  if (digits.length > 8) {
    formatted += `-${digits.slice(8, 10)}`;
  }

  return formatted;
}

function isAddressRequiredFieldsFilled(address) {
  return (
    address.street.trim() &&
    address.house.trim() &&
    address.apartment.trim() &&
    address.entrance.trim()
  );
}

function formatAddressSummary(address) {
  const base = `${address.street}, д. ${address.house}, кв. ${address.apartment}, подъезд ${address.entrance}`;
  if (!address.intercomCode.trim()) {
    return base;
  }
  return `${base}, код ${address.intercomCode}`;
}

function ProfilePage({ onGoHome, onLogout, embedded = false }) {
  const [activeTab, setActiveTab] = useState('data');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const [profileData, setProfileData] = useState(PROFILE_DATA);
  const [profileDraft, setProfileDraft] = useState(PROFILE_DATA);
  const [addressesData, setAddressesData] = useState(DELIVERY_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState(DELIVERY_ADDRESSES[0]?.id ?? null);
  const [addressDraft, setAddressDraft] = useState(null);
  const [profileErrors, setProfileErrors] = useState({});
  const [addressError, setAddressError] = useState('');

  const validateProfileDraft = () => {
    const nextErrors = {};
    const name = profileDraft.name.trim();
    const email = profileDraft.email.trim();
    const phoneDigits = normalizePhoneDigits(profileDraft.phone);

    if (name.length < 2) {
      nextErrors.name = 'Имя должно содержать минимум 2 символа.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Введите корректное значение.';
    }

    if (phoneDigits.length !== 10) {
      nextErrors.phone = 'Введите корректное значение.';
    }

    setProfileErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const startEditing = () => {
    setProfileDraft(profileData);
    setProfileErrors({});
    setIsEditingProfile(true);
  };

  const cancelEditing = () => {
    setProfileDraft(profileData);
    setProfileErrors({});
    setIsEditingProfile(false);
  };

  const saveEditing = (event) => {
    event.preventDefault();
    if (!validateProfileDraft()) {
      return;
    }
    setProfileData(profileDraft);
    setProfileErrors({});
    setIsEditingProfile(false);
  };

  const startAddressEditing = () => {
    const nextSelectedAddressId = selectedAddressId ?? addressesData[0]?.id ?? null;
    const selectedAddress = addressesData.find((address) => address.id === nextSelectedAddressId);
    setSelectedAddressId(nextSelectedAddressId);
    setAddressDraft(selectedAddress ? { ...selectedAddress } : null);
    setAddressError('');
    setIsEditingAddresses(true);
  };

  const cancelAddressEditing = () => {
    setAddressDraft(null);
    setAddressError('');
    setIsEditingAddresses(false);
  };

  const saveAddressEditing = (event) => {
    event.preventDefault();
    if (!addressDraft) {
      setAddressError('Добавьте хотя бы один адрес.');
      return;
    }

    if (!isAddressRequiredFieldsFilled(addressDraft)) {
      setAddressError('Введите корректное значение.');
      return;
    }

    setAddressesData((prev) => prev.map((address) => (address.id === addressDraft.id ? { ...addressDraft } : address)));
    setSelectedAddressId(addressDraft.id);
    setAddressDraft(null);
    setAddressError('');
    setIsEditingAddresses(false);
  };

  const addAddressField = () => {
    const newAddress = {
      id: `addr-${Date.now()}`,
      street: '',
      house: '',
      apartment: '',
      entrance: '',
      intercomCode: '',
    };

    setAddressesData((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
    setAddressDraft(newAddress);
    setAddressError('');
  };

  const removeAddressField = (id) => {
    setAddressesData((prev) => {
      const nextAddresses = prev.filter((address) => address.id !== id);
      const fallbackSelectedId = nextAddresses[0]?.id ?? null;
      setSelectedAddressId(fallbackSelectedId);
      setAddressDraft(fallbackSelectedId ? { ...nextAddresses[0] } : null);
      if (nextAddresses.length === 0) {
        setAddressError('Добавьте хотя бы один адрес.');
      } else {
        setAddressError('');
      }
      return nextAddresses;
    });
  };

  return (
    <main className={`utilityPage profilePage ${embedded ? 'profilePageEmbedded' : ''}`}>
      <section className="utilityCard" aria-labelledby="profile-heading">
        <div className={`utilityHeader ${embedded ? 'utilityHeaderEmbedded' : ''}`}>
          <button type="button" className={`utilityBackLink ${embedded ? 'profileCloseButton' : ''}`} onClick={onGoHome}>
            {embedded ? '×' : 'На главную'}
          </button>
        </div>

        <h1 id="profile-heading" className="utilityTitle">
          Профиль
        </h1>
        <p className="utilitySubtitle">Управляйте личными данными, адресами и заказами</p>

        <div className="profileLayout">
          <aside className="profileSidebar" aria-label="Меню профиля">
            <div className="profileSidebarTop">
              <div className="profileAvatar" aria-hidden="true">
                {profileData.name.trim().slice(0, 1).toUpperCase() || 'G'}
              </div>
              <div>
                <p className="profileName">{profileData.name}</p>
              </div>
            </div>

            <nav>
              <ul className="profileTabList">
                {PROFILE_TABS.map((tab) => (
                  <li key={tab.id}>
                    <button
                      type="button"
                      className={`profileTabButton ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <span className="profileTabDot" aria-hidden="true" />
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <button type="button" className="utilityButton utilityButtonDanger profileLogoutButton" onClick={onLogout}>
              Выйти
            </button>
          </aside>

          <div className="profileContent">
            {activeTab === 'data' && (
              <section className="profileSection" aria-labelledby="profile-data-heading">
                <div className="profileSectionHeader">
                  <h2 id="profile-data-heading">Личные данные</h2>
                  {!isEditingProfile && (
                    <button type="button" className="utilityButton utilityButtonSecondary" onClick={startEditing}>
                      Редактировать
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form className="profileEditForm" onSubmit={saveEditing} noValidate>
                    <label className="profileEditField">
                      <span>Имя</span>
                      <input
                        type="text"
                        value={profileDraft.name}
                        onChange={(event) => {
                          const value = event.target.value;
                          setProfileDraft((prev) => ({ ...prev, name: value }));
                          if (profileErrors.name && value.trim().length >= 2) {
                            setProfileErrors((prev) => ({ ...prev, name: '' }));
                          }
                        }}
                        required
                        className={profileErrors.name ? 'fieldInvalid' : ''}
                      />
                      {profileErrors.name && <small className="authError">{profileErrors.name}</small>}
                    </label>

                    <label className="profileEditField">
                      <span>Email</span>
                      <input
                        type="email"
                        value={profileDraft.email}
                        onChange={(event) => {
                          const value = event.target.value;
                          setProfileDraft((prev) => ({ ...prev, email: value }));
                          if (profileErrors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
                            setProfileErrors((prev) => ({ ...prev, email: '' }));
                          }
                        }}
                        required
                        className={profileErrors.email ? 'fieldInvalid' : ''}
                      />
                      {profileErrors.email && <small className="authError">{profileErrors.email}</small>}
                    </label>

                    <label className="profileEditField">
                      <span>Телефон</span>
                      <input
                        type="tel"
                        value={profileDraft.phone}
                        inputMode="numeric"
                        placeholder="+7 (___) ___-__-__"
                        onChange={(event) => {
                          const nextRawValue = event.target.value;
                          setProfileDraft((prev) => {
                            const prevValue = prev.phone;
                            const prevDigits = normalizePhoneDigits(prevValue);
                            let nextDigits = normalizePhoneDigits(nextRawValue);

                            // If Backspace removes only mask chars, remove previous actual digit.
                            const isDeleting = nextRawValue.length < prevValue.length;
                            if (isDeleting && nextDigits === prevDigits && prevDigits.length > 0) {
                              nextDigits = prevDigits.slice(0, -1);
                            }

                            return { ...prev, phone: formatPhoneFromDigits(nextDigits) };
                          });

                          if (profileErrors.phone) {
                            const digits = normalizePhoneDigits(nextRawValue);
                            if (digits.length === 10) {
                              setProfileErrors((prev) => ({ ...prev, phone: '' }));
                            }
                          }
                        }}
                        required
                        className={profileErrors.phone ? 'fieldInvalid' : ''}
                      />
                      {profileErrors.phone && <small className="authError">{profileErrors.phone}</small>}
                    </label>

                    <div className="profileEditActions">
                      <button type="button" className="utilityButton utilityButtonSecondary" onClick={cancelEditing}>
                        Отмена
                      </button>
                      <button type="submit" className="utilityButton utilityButtonPrimary">
                        Сохранить
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="utilityGrid">
                    <article className="utilityItem">
                      <h3>Имя</h3>
                      <p>{profileData.name}</p>
                    </article>
                    <article className="utilityItem">
                      <h3>Email</h3>
                      <p>{profileData.email}</p>
                    </article>
                    <article className="utilityItem">
                      <h3>Телефон</h3>
                      <p>{profileData.phone}</p>
                    </article>
                  </div>
                )}
              </section>
            )}

            {activeTab === 'addresses' && (
              <section className="profileSection" aria-labelledby="profile-addresses-heading">
                <div className="profileSectionHeader">
                  <h2 id="profile-addresses-heading">Адреса доставки</h2>
                  {!isEditingAddresses && (
                    <button type="button" className="utilityButton utilityButtonSecondary" onClick={startAddressEditing}>
                      Изменить адреса
                    </button>
                  )}
                </div>

                {isEditingAddresses ? (
                  <form className="profileEditForm" onSubmit={saveAddressEditing}>
                    {addressDraft && (
                      <div className="addressEditRow" key={addressDraft.id}>
                        <div className="addressFieldsGrid">
                          <label className="profileEditField">
                            <span>Улица</span>
                            <input
                              type="text"
                              value={addressDraft.street}
                              onChange={(event) => {
                                const value = event.target.value;
                                setAddressDraft((prev) => ({ ...prev, street: value }));
                                if (addressError) {
                                  setAddressError('');
                                }
                              }}
                              required
                            />
                          </label>

                          <label className="profileEditField">
                            <span>Дом</span>
                            <input
                              type="text"
                              value={addressDraft.house}
                              onChange={(event) => {
                                const value = event.target.value;
                                setAddressDraft((prev) => ({ ...prev, house: value }));
                                if (addressError) {
                                  setAddressError('');
                                }
                              }}
                              required
                            />
                          </label>

                          <label className="profileEditField">
                            <span>Квартира</span>
                            <input
                              type="text"
                              value={addressDraft.apartment}
                              onChange={(event) => {
                                const value = event.target.value;
                                setAddressDraft((prev) => ({ ...prev, apartment: value }));
                                if (addressError) {
                                  setAddressError('');
                                }
                              }}
                              required
                            />
                          </label>

                          <label className="profileEditField">
                            <span>Подъезд</span>
                            <input
                              type="text"
                              value={addressDraft.entrance}
                              onChange={(event) => {
                                const value = event.target.value;
                                setAddressDraft((prev) => ({ ...prev, entrance: value }));
                                if (addressError) {
                                  setAddressError('');
                                }
                              }}
                              required
                            />
                          </label>

                          <label className="profileEditField">
                            <span>Код от подъезда</span>
                            <input
                              type="text"
                              value={addressDraft.intercomCode}
                              onChange={(event) => {
                                const value = event.target.value;
                                setAddressDraft((prev) => ({ ...prev, intercomCode: value }));
                              }}
                            />
                          </label>
                        </div>
                        <button
                          type="button"
                          className="utilityButton utilityButtonDelete addressDeleteButton"
                          onClick={() => removeAddressField(addressDraft.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    )}

                    {addressError && <small className="authError">{addressError}</small>}

                    <div className="profileEditActions">
                      <button type="button" className="utilityButton utilityButtonSecondary" onClick={addAddressField}>
                        Добавить адрес
                      </button>
                      <button type="button" className="utilityButton utilityButtonSecondary" onClick={cancelAddressEditing}>
                        Отмена
                      </button>
                      <button type="submit" className="utilityButton utilityButtonPrimary">
                        Сохранить
                      </button>
                    </div>
                  </form>
                ) : (
                  <ul className="profileList">
                    {addressesData.map((address) => (
                      <li className="profileListItem" key={address.id}>
                        <button
                          type="button"
                          className={`addressItemButton ${selectedAddressId === address.id ? 'addressSelected' : ''}`}
                          onClick={() => setSelectedAddressId(address.id)}
                        >
                          <span>{formatAddressSummary(address)}</span>
                          {selectedAddressId === address.id && <strong className="addressSelectedMark">Выбран</strong>}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {activeTab === 'orders' && (
              <section className="profileSection" aria-labelledby="profile-orders-heading">
                <div className="profileSectionHeader">
                  <h2 id="profile-orders-heading">История заказов</h2>
                  <button type="button" className="utilityButton utilityButtonSecondary">
                    Смотреть все
                  </button>
                </div>

                <ul className="profileList">
                  {ORDERS_HISTORY.map((order) => (
                    <li className="profileListItem orderListItem" key={order.id}>
                      <p className="orderNumber">Заказ #{order.id}</p>
                      <p className="orderMeta">Дата и время: {order.dateTime}</p>
                      <p className="orderMeta">Сумма заказа: {order.total}</p>
                      <p className="orderMeta">Адрес доставки: {order.deliveryAddress}</p>
                      <p className="orderPositionsTitle">Позиции:</p>
                      <ul className="orderPositionsList">
                        {order.positions.map((position) => (
                          <li key={`${order.id}-${position}`}>{position}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
