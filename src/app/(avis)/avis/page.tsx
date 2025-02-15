/* eslint-disable @next/next/no-img-element */
import NavBar from "@/components/TailwindUi/NavBar";
import BigFooter from "@/components/footer/BigFooter";
import { avis } from "@/utils/avis";
import { StarIcon } from "@heroicons/react/20/solid";

const reviews = {
  average: 5,
  totalCount: 51,
  counts: [
    { rating: 5, count: 24 },
    { rating: 4, count: 27 },
    { rating: 3, count: 0 },
    { rating: 2, count: 0 },
    { rating: 1, count: 0 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const page = () => {
  return (
    <>
      <NavBar />
      <main className="">
        <div className="w-full h-0.5 bg-slate-100"></div>{" "}
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:grid lg:max-w-6xl lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Avis clients
            </h2>

            <div className="mt-3 flex items-center">
              <div>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
              </div>
              <p className="ml-2 text-sm text-gray-900">
                Basé sur {reviews.totalCount} avis
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Review data</h3>

              <dl className="space-y">
                {reviews.counts.map((count) => (
                  <div key={count.rating} className="flex items-center text-sm">
                    <dt className="flex flex-1 items-center">
                      <p className="w-3 font-medium text-gray-900">
                        {count.rating}
                        <span className="sr-only"> star reviews</span>
                      </p>
                      <div
                        aria-hidden="true"
                        className="flex flex-1 items-center"
                      >
                        <StarIcon
                          className={classNames(
                            count.count > 0
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        <div className="relative ml-3 flex-1">
                          <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                          {count.count > 0 ? (
                            <div
                              className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                              style={{
                                width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                    </dt>
                    <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                      {Math.round((count.count / reviews.totalCount) * 100)}%
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900">
                Partagez votre expérience avec les autres utilisateurs
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                <b>Tous nos avis sont vérifiés.</b> Si vous avez bénéficié de
                nos services, n&apos;hésitez pas à partager votre expérience.
                Après validation de votre dossier, un mail de satisfaction
                client vous a été envoyé. Contactez-nous si besoin.
              </p>

              <a
                href="/devenir-auto-entrepreneur"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
              >
                Devenir auto-entrepreneur
              </a>
            </div>
          </div>

          <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <h3 className="sr-only">Recent reviews</h3>

            <div className="flow-root">
              <div className="-my-12 divide-y divide-gray-200">
                {avis.map((review) => (
                  <div key={(review as { id: number }).id} className="py-12">
                    <div className="flex items-center">
                      <div className="">
                        {typeof review === "object" && "date" in review && (
                          <h4 className="text-sm font-bold text-gray-900">
                            {review.date}
                          </h4>
                        )}
                        <div className="mt-1 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                (
                                  review as {
                                    id: number;
                                    date: string;
                                    avis: string;
                                    note: number;
                                  }
                                ).note > rating
                                  ? "text-yellow-400"
                                  : "text-gray-300",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">
                          {
                            (
                              review as {
                                id: number;
                                date: string;
                                avis: string;
                                note: number;
                              }
                            ).note
                          }{" "}
                          out of 5 stars
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 space-y-6 text-base italic text-gray-600">
                      {
                        (
                          review as {
                            id: number;
                            date: string;
                            avis: string;
                            note: number;
                          }
                        ).avis
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <BigFooter />
    </>
  );
};

export default page;
